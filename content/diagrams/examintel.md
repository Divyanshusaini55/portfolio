# Project Journey Map 
```markmap
# ExamIntel Engineering Journey
## Phase 1: Discovery & Architecture Design
- Core Problem Identification
  - Manual exam prep and grading loop latency
  - Absence of customized practice resources from raw syllabus PDFs
- Architecture & Stack Selection
  - Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS, Shadcn UI
  - Backend: Django 4.2, Django REST Framework (DRF), Django Signals
  - Data Layer: PostgreSQL (Neon), Redis 7 (broker, cache, session store)
  - AI Orchestration: Google Gemini API, LangGraph

## Phase 2: Ingestion & AI Pipelines
- Document Extraction
  - PyPDF2 text extraction from academic documents
  - 8KB payload chunking for context window management
- Stateful LangGraph Orchestration
  - `QuestionAnalyzerGraph` for batch question categorization
  - `ExamSummaryGraph` with validation retry loop (QualityValidator)
  - `RoadmapEngineGraph` translating syllabus structure to knowledge graphs
  - `CurrentAffairsFetcherGraph` Daily RSS news scraping + AI translation (Hindi)

## Phase 3: Decoupling & Queue Engineering
- Asynchronous Task Queue Setup
  - Celery task framework mapping heavy Gemini calls away from HTTP thread pool
  - Specialized workers (Summary, Roadmap, PDF, Analytics, Notification)
- Concurrency & Lock Management
  - Custom Redis-backed lock manager (`acquire_job_lock`) for task mutual exclusion
  - Telemetry tracking via atomic progress updates (`BackgroundJob` model)
- Django ORM Optimization
  - Eliminating N+1 queries using `select_related` and `prefetch_related`
  - Decoupling heavy XP/reputation ranking triggers into asynchronous loops

## Phase 4: Production Deployment & Observability
- Virtualization
  - Multi-container setup via Docker Compose (Gunicorn, Next.js, Redis, Celery workers)
- Nginx Web Server
  - Reverse proxy configurations routing domain gateways (`api.examintel.in` / `examintel.in`)
  - SSL termination & media files serving
- Observability Dashboard
  - Flower dashboard configuration to monitor worker queue latency, throughput, and retries
```



# Diagram 1: High-Level Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["Browser / Mobile"]
        NextJS["Next.js 14<br/>App Router + TypeScript<br/>localhost:4005"]
    end

    subgraph Proxy["Nginx Reverse Proxy"]
        Nginx["Nginx<br/>/api/* → :9000<br/>/* → :4005"]
    end

    subgraph DjangoAPI["Django REST API (:8000 / :9000)"]
        CoreURLs["core/urls.py<br/>/ · /admin/ · /health/<br/>/api/ · /api/community/<br/>/api/resource-hub/<br/>/api/docs/"]
        QuizURLs["quiz/urls.py<br/>Router: categories, subcategories<br/>exams, uploads, suggestions<br/>current-affairs, roadmaps, resources"]
        CommunityURLs["community/urls.py<br/>Router: profiles, solutions<br/>comments, notifications<br/>contributors/* · settings/*"]
        ResourceURLs["resources/urls.py<br/>topic/[slug]/ · [slug]/<br/>[slug]/mark-done/<br/>[slug]/bookmark/"]
        AuthURLs["views_auth.py<br/>auth/register/ · auth/login/<br/>auth/token/refresh/<br/>auth/user/<br/>auth/password-reset/"]
        HealthURL["health/urls.py<br/>health/"]
    end

    subgraph AIEngine["AI Engine — quiz/ai/"]
        GeminiClient["GeminiClient<br/>primary: gemini-2.5-flash<br/>fallback: gemini-2.5-pro<br/>backoff on 429"]
        LangGraphPkg["langgraph/<br/>ExamSummaryGraph<br/>QuestionAnalyzerGraph<br/>RoadmapEngineGraph<br/>CurrentAffairsFetcherGraph"]
        SummaryService["summary_service.py<br/>ExamSummaryService"]
        RoadmapEngine["roadmap_engine.py<br/>RoadmapEngine"]
        AggEngine["aggregation_engine.py"]
        PromptBuilder["prompt_builder.py"]
        QValidator["validators.py<br/>QualityValidator"]
    end

    subgraph CeleryWorkers["Celery Workers (5 specialized)"]
        SummaryW["summary_worker<br/>Q: normal, low<br/>concurrency: 2"]
        RoadmapW["roadmap_worker<br/>Q: normal, maintenance<br/>pool: threads · conc: 4"]
        PDFW["pdf_worker<br/>Q: high, normal<br/>pool: threads · conc: 4"]
        AnalyticsW["analytics_worker<br/>Q: low, maintenance<br/>pool: threads · conc: 4"]
        NotifW["notification_worker<br/>Q: high<br/>pool: threads · conc: 4"]
        Beat["celery beat<br/>DatabaseScheduler<br/>cron: 06:00 current-affairs<br/>*/10min leaderboard"]
        Flower["flower :5555<br/>monitoring dashboard"]
    end

    subgraph DataLayer["Data Layer"]
        PostgreSQL["PostgreSQL<br/>(Neon — via DATABASE_URL)"]
        Redis0["Redis DB0<br/>Broker + Result Backend"]
        Redis1["Redis DB1<br/>Cache (django_redis)<br/>KEY_PREFIX: exam_engine<br/>TIMEOUT: 300s"]
        Redis2["Redis DB2<br/>Session Store"]
        MediaVol["/var/www/examintel/media<br/>avatars/ · pdfs/<br/>question_images/<br/>syllabus_pdfs/"]
    end

    subgraph External["External Services"]
        GeminiAPI["Google Gemini API<br/>gemini-2.5-flash / pro"]
        RSSFeeds["RSS Feeds<br/>The Hindu · Indian Express<br/>NDTV · TOI · HT<br/>LiveMint · BS · ET"]
        Newspaper3k["newspaper3k<br/>article body scraper"]
        Neon["Neon (PostgreSQL SaaS)"]
        Upstash["Upstash (Redis SaaS)<br/>rediss:// with ssl_cert_reqs: NONE"]
    end

    Browser --> Nginx
    Nginx -->|"/api/*"| DjangoAPI
    Nginx -->|"/*"| NextJS
    NextJS -->|"axios · Bearer JWT<br/>auto-refresh on 401"| DjangoAPI
    DjangoAPI --> AIEngine
    DjangoAPI --> DataLayer
    AIEngine --> GeminiClient
    GeminiClient --> GeminiAPI
    LangGraphPkg --> GeminiClient
    DjangoAPI -->|"dispatch via events/dispatch.py<br/>or .delay()"| CeleryWorkers
    CeleryWorkers --> AIEngine
    CeleryWorkers --> DataLayer
    CurrentAffairsFetcherGraph --> RSSFeeds
    CurrentAffairsFetcherGraph --> Newspaper3k
    PostgreSQL --- Neon
    Redis0 --- Upstash
```
# Diagram 2: Project Structure Mind Map

```markmap
# exam_intel
## frontend (Next.js 14)
### app/
- category/[categorySlug]/[subcategorySlug]
- exam/[examSlug]
- dashboard/[examSlug]
- summary/[examSlug]
- roadmap/[subcategorySlug]
- daily-dose/[slug]
- resources/[slug]
- shift/[examSlug]
- loading/[examSlug]
### components/
- exam-taking-interface.tsx
- performance-analysis.tsx
- topic-resource-hub.tsx
- article-viewer.tsx
- summary-modal.tsx
- markdown-renderer.tsx
- latex-renderer.tsx
### lib/
- api.ts (axios · JWT · auto-refresh)
- apiClient.ts (deprecated fetch wrapper)
- seo.ts
### context/
- auth-context.tsx
- exam-language-context.tsx
### hooks/
- useAuthGuard.ts
- useNoIndex.ts

## backend (Django 4 / DRF)
### core/
- settings.py (4 Celery queues · JWT · Redis · Jazzmin)
- celery.py (beat: 3 schedules)
- urls.py
### quiz/
- models.py (14 models)
- api.py (8 ViewSets + 4 fn views)
- api_summary.py
- api_session.py
- api_dashboard.py
- api_leaderboard.py
- ai/
  - gemini_client.py (fallback · backoff · token logging)
  - langgraph/
    - ExamSummaryGraph (self-correction ≤3)
    - QuestionAnalyzerGraph (batch loop)
    - RoadmapEngineGraph (retry ≤1)
    - CurrentAffairsFetcherGraph (article loop)
  - summary_service.py
  - roadmap_engine.py
  - aggregation_engine.py
  - prompt_builder.py
  - validators.py
- management/commands/
  - fetch_current_affairs.py
  - generate_exam_summary.py
  - generate_roadmap.py
  - import_exam_json.py
### community/
- models.py (Profile · Badge · Solution · Comment · Notification)
- views.py
- signals.py
- services.py
### resources/
- views.py (4 class-based views)
- serializers.py
### tasks/
- summary_tasks.py (generate_exam_summary · generate_topic_explanation)
- roadmap_tasks.py (generate_exam_roadmap · refresh_roadmap_resources)
- pdf_tasks.py
- analytics_tasks.py
- notification_tasks.py
### cache/
- dashboard.py
- leaderboard.py
- roadmap.py
- summary.py
- profile.py
### events/
- dispatch.py (register_handler · dispatch_event)
### jobs/
- models.py
- services.py (create_job · start_job · update_progress · complete_job · fail_job)

## infrastructure
### Docker
- docker-compose.prod.yml (9 services)
- Dockerfile (backend)
- Dockerfile.prod (frontend)
### Deployment
- Nginx (reverse proxy)
- Hostinger VPS
- entrypoint.sh
- build.sh
- Procfile
```

# Diagram 3: Component Architecture

```mermaid
graph TB
    subgraph NextPages["Next.js App Router Pages"]
        Home["/ — Home"]
        ExamPage["exam/[examSlug]"]
        Dashboard["dashboard/[examSlug]"]
        SummaryPage["summary/[examSlug]"]
        RoadmapPage["roadmap/[subcategorySlug]"]
        DailyDose["daily-dose/[slug]"]
        ResourcePage["resources/[slug]"]
        CategoryPage["category/[cat]/[subcat]"]
        ShiftPage["shift/[examSlug]"]
        LoadingPage["loading/[examSlug]"]
    end

    subgraph SharedComponents["Shared Components"]
        ExamInterface["exam-taking-interface.tsx<br/>question navigation · timer<br/>auto-save answers"]
        PerfAnalysis["performance-analysis.tsx<br/>score · weak topics<br/>subject breakdown"]
        ResourceHub["topic-resource-hub.tsx<br/>resource cards · filters<br/>bookmark · mark-done"]
        ArticleViewer["article-viewer.tsx<br/>markdown + LaTeX render<br/>current affairs"]
        SummaryModal["summary-modal.tsx<br/>AI summary viewer"]
        Navbar["navbar.tsx"]
        LatexRenderer["latex-renderer.tsx"]
        MarkdownRenderer["markdown-renderer.tsx"]
        SuggestCorrection["suggest-correction-modal.tsx"]
        Timer["Timer.tsx"]
        MobileNav["mobile-question-navigator.tsx"]
    end

    subgraph UIKit["UI Library (shadcn/ui)"]
        Button["button"]
        Card["card"]
        Dialog["dialog"]
        Badge["badge"]
        Sheet["sheet"]
        Skeleton["skeleton"]
        Popover["popover"]
    end

    subgraph StateCtx["State & Context"]
        AuthCtx["auth-context.tsx<br/>user · token · isAuthenticated"]
        LangCtx["exam-language-context.tsx<br/>language switching en/hi"]
        AuthGuard["useAuthGuard.ts<br/>redirect to /login"]
        NoIndex["useNoIndex.ts"]
    end

    subgraph APIClients["API Client Layer — api.ts"]
        ExamAPI["examApi<br/>list · get · getQuestions<br/>startSession · submitExam<br/>submitAnswer · getSummary<br/>explainQuestion · getLeaderboard"]
        CommunityAPI["communityApi<br/>comments · profile<br/>notifications"]
        DailyDoseAPI["dailyDoseApi<br/>getCurrentAffairs<br/>getAffairBySlug"]
        RoadmapAPI["roadmapApi<br/>getRoadmap · updateTopicStatus<br/>toggleRoadmapBookmark"]
        ContributorAPI["contributorApi<br/>getOverview · getMyStats<br/>getTop · getBadges · getProfile"]
        AuthAPI["authApi<br/>login · register · getUser<br/>resetPassword"]
        ResourceHubAPI["resourceHubApi<br/>markDone · bookmark"]
        AdminAPI["adminApi<br/>contact messages"]
        AxiosInstance["axios instance<br/>Bearer JWT injection<br/>401 → auto-refresh<br/>timeout: 30s"]
    end

    ExamPage --> ExamInterface & SummaryModal & SuggestCorrection
    Dashboard --> PerfAnalysis
    RoadmapPage --> ResourceHub
    DailyDose --> ArticleViewer
    ResourcePage --> ArticleViewer & MarkdownRenderer & LatexRenderer
    SharedComponents --> UIKit
    ExamPage & Dashboard & RoadmapPage --> StateCtx
    APIClients --> AxiosInstance
    ExamInterface --> ExamAPI
    ResourceHub --> ResourceHubAPI
    ArticleViewer --> DailyDoseAPI
    RoadmapPage --> RoadmapAPI
```

# Diagram 4: API Request Flow

```mermaid
sequenceDiagram
    participant U as User Browser
    participant N as Next.js :4005
    participant Nginx as Nginx Proxy
    participant D as Django API :9000
    participant Cache as Redis DB1 (Cache)
    participant DB as PostgreSQL (Neon)
    participant Jobs as jobs.services
    participant Q as Redis DB0 (Celery Queue)
    participant W as Celery Worker
    participant AI as LangGraph + Gemini

    Note over U,AI: Exam Load Flow
    U->>N: Navigate /exam/[examSlug]
    N->>Nginx: GET /api/exams/{slug}/
    Nginx->>D: proxy_pass :8000
    D->>Cache: GET exam:{slug}:en
    alt Cache Hit (TTL 300s)
        Cache-->>D: cached exam JSON
    else Cache Miss
        D->>DB: Exam.objects.filter(slug=slug)<br/>.annotate(question_count)
        DB-->>D: Exam + related data
        D->>Cache: SET exam:{slug}:en 300s
    end
    D-->>N: ExamSerializer JSON
    N-->>U: Render exam interface

    Note over U,AI: Exam Submit Flow
    U->>N: Submit exam
    N->>D: POST /api/exams/{slug}/submit/
    D->>DB: UserAnswer.objects.filter(exam, session_id)<br/>Calculate: positive_score - (wrong × negative_marks)
    DB-->>D: answers + score
    D->>DB: ExamAttempt.save(score, percentage, is_completed=True)
    D-->>N: {score, correct, wrong, penalty, percentage}

    Note over U,AI: AI Summary Flow
    U->>N: Request summary
    N->>D: GET /api/exams/{slug}/summary/
    D->>DB: Check BackgroundJob QUEUED/RUNNING
    alt Job already running
        D-->>N: 202 {job_id, status: queued}
    else No active job
        D->>Jobs: create_job(type=ai.summary)
        Jobs->>DB: BackgroundJob.create()
        D->>Q: generate_exam_summary.delay(job_id, exam_id)
        D-->>N: 202 {job_id, status: queued}
        Q->>W: summary_worker dequeues task
        W->>Jobs: start_job(job_id) → update_progress(30%)
        W->>AI: ExamSummaryGraph.generate(exam_id)
        AI->>AI: node_sample → node_analyze<br/>→ node_generate → node_validate
        alt Validation fails (retry ≤3)
            AI->>AI: inject feedback → node_generate again
        end
        AI->>DB: Exam.objects.filter(pk).update(ai_summary=...)
        W->>Cache: invalidate_exam_summary(exam_id)
        W->>Jobs: complete_job(job_id)
    end
```


# Diagram 5: Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant N as Next.js
    participant AC as AuthContext
    participant AxiosInt as axios interceptor
    participant D as Django API
    participant JWT as SimpleJWT
    participant DB as PostgreSQL

    Note over U,DB: Login
    U->>N: POST credentials to /login
    N->>D: POST /api/auth/login/
    D->>JWT: authenticate(username, password)
    JWT->>DB: User.objects.get(username=...)
    DB-->>JWT: User record
    JWT-->>D: access (60min) + refresh (7 days)
    D-->>N: {access, refresh, user}
    N->>AC: setUser(user)<br/>localStorage.setItem(auth_token, access)<br/>localStorage.setItem(refresh_token, refresh)
    AC-->>U: redirect to intended page

    Note over U,DB: Authenticated Request
    U->>N: Navigate to protected page
    N->>AxiosInt: api.get('/auth/user/')
    AxiosInt->>AxiosInt: read auth_token from localStorage<br/>inject Authorization: Bearer {token}
    AxiosInt->>D: GET /api/auth/user/
    D->>JWT: JWTAuthentication.authenticate()
    JWT-->>D: request.user
    D-->>N: UserProfile JSON
    N-->>U: Render profile

    Note over U,DB: Token Expiry + Auto-Refresh
    N->>D: Any request with expired access token
    D-->>AxiosInt: 401 Unauthorized
    AxiosInt->>AxiosInt: originalRequest._retry = true<br/>read refresh_token from localStorage
    AxiosInt->>D: POST /api/auth/token/refresh/ {refresh}
    D->>JWT: verify refresh token
    JWT-->>D: new access token
    D-->>AxiosInt: {access: new_token}
    AxiosInt->>AxiosInt: localStorage.setItem(auth_token, new_token)<br/>inject new Bearer into original request
    AxiosInt->>D: retry original request
    D-->>N: original response

    Note over U,DB: No Refresh Token
    AxiosInt->>AxiosInt: no refresh_token found<br/>localStorage.removeItem(auth_token)<br/>delete Authorization header
    AxiosInt->>D: retry original request without auth
    D-->>N: public response (AllowAny) or 401

    Note over U,DB: Route Guard
    U->>N: Navigate to /dashboard
    N->>AC: useAuthGuard() checks isAuthenticated
    alt Not authenticated
        AC-->>N: router.push('/login')
    else Authenticated
        AC-->>N: allow render
    end
```

# Diagram 6: Database ER Diagram

```mermaid
erDiagram
    User {
        int id PK
        string username UK
        string email
        string password
        bool is_staff
        bool is_active
    }
    Category {
        int id PK
        string name
        string slug UK
        string description
        string icon
        int order
        bool is_active
        string icon_color
        string bg_color
    }
    SubCategory {
        int id PK
        int category_id FK
        string name
        string slug UK
        string description
        string icon
        int order
        bool is_active
        file syllabus_pdf
    }
    Exam {
        int id PK
        int subcategory_id FK
        string title
        string slug UK
        text ai_summary
        int year
        string shift
        string status
        file pdf_file
        int duration_minutes
        int total_questions
        decimal marks_per_question
        decimal negative_marks
        int total_marks
        bool is_active
        json supported_languages
    }
    Question {
        int id PK
        int exam_id FK
        text question_text
        image image
        bool is_image_based
        string question_type
        int order
        int marks
        json metadata
        text explanation
        string subject
        string topic
        string difficulty
    }
    Answer {
        int id PK
        int question_id FK
        text answer_text
        bool is_correct
        int order
    }
    UserAnswer {
        int id PK
        int exam_id FK
        int question_id FK
        int selected_answer_id FK
        text text_answer
        bool is_correct
        string session_id
        bool is_flagged_for_review
        bool is_bookmarked
    }
    ExamAttempt {
        int id PK
        int user_id FK
        int exam_id FK
        float score
        int total_questions
        int correct_answers
        float percentage
        string session_id
        int duration
        bool is_completed
        int current_question_index
        string guest_name
        string guest_email
    }
    PracticeSession {
        int id PK
        int user_id FK
        int exam_id FK
        float score
        float accuracy
        string session_id
        int duration
        bool is_completed
        int current_question_index
        bool is_paused
    }
    CurrentAffair {
        int id PK
        int category_id FK
        string title
        string slug UK
        text content
        text summary
        string source_name
        string source_url
        date published_date
    }
    ExamRoadmap {
        int id PK
        int subcategory_id FK
        string title
        text description
    }
    RoadmapPhase {
        int id PK
        int roadmap_id FK
        string title
        text description
        int order
    }
    RoadmapTopic {
        int id PK
        int phase_id FK
        string title
        string slug UK
        text description
        int estimated_minutes
        int order
        json resources
    }
    UserTopicProgress {
        int id PK
        int user_id FK
        int topic_id FK
        string status
        datetime completed_at
    }
    ResourceTag {
        int id PK
        string name UK
        string slug UK
        string color
    }
    TopicResource {
        int id PK
        int topic_id FK
        int created_by_id FK
        string title
        string slug UK
        string resource_type
        string content_format
        text markdown_content
        text html_content
        text latex_content
        string external_url
        int estimated_read_minutes
        string difficulty
        int order
        bool is_featured
        bool is_published
        bool is_ai_generated
        text ai_summary
        int view_count
    }
    ResourceProgress {
        int id PK
        int user_id FK
        int resource_id FK
        bool is_completed
        datetime last_viewed_at
    }
    ResourceBookmark {
        int id PK
        int user_id FK
        int resource_id FK
        datetime bookmarked_at
    }
    Profile {
        int id PK
        int user_id FK
        string avatar_char
        image avatar_image
        text bio
        int xp
        int streak
        int best_streak
        int total_solutions
        int total_comments
        int total_upvotes_received
        float reputation_score
        int community_rank
        float percentile
    }
    Badge {
        int id PK
        string name UK
        string slug UK
        string description
        string icon
        string criteria_type
        int criteria_value
        bool is_active
    }
    UserBadge {
        int id PK
        int user_id FK
        int badge_id FK
        datetime awarded_at
    }
    Solution {
        int id PK
        int user_id FK
        int question_id FK
        text content
        int upvotes
        int views
        bool is_ai_generated
        bool ai_verified
    }
    SolutionUpvote {
        int id PK
        int solution_id FK
        int user_id FK
    }
    Comment {
        int id PK
        int user_id FK
        int question_id FK
        int solution_id FK
        int parent_id FK
        text text
        int upvotes
    }
    CommentUpvote {
        int id PK
        int comment_id FK
        int user_id FK
    }
    Notification {
        int id PK
        int user_id FK
        string type
        string title
        text message
        bool is_read
    }
    ContributorActivity {
        int id PK
        int user_id FK
        string activity_type
        string description
        json metadata
    }
    UserSettings {
        int id PK
        int user_id FK
        int primary_exam_id FK
        string preferred_language
        int daily_study_goal
        bool notify_exam_results
        string theme
        bool is_public_profile
    }
    QuestionPaperUpload {
        int id PK
        int user_id FK
        int category_id FK
        string subject
        date exam_date
        file file
        string status
    }
    CorrectionSuggestion {
        int id PK
        int user_id FK
        int question_id FK
        string type
        json suggestion_data
        string status
        int upvotes
    }
    ContactMessage {
        int id PK
        string name
        string email
        text message
        string status
    }

    Category ||--o{ SubCategory : has
    SubCategory ||--o{ Exam : contains
    SubCategory ||--o| ExamRoadmap : has
    Exam ||--o{ Question : has
    Question ||--o{ Answer : has
    Question ||--o{ UserAnswer : answered_in
    Question ||--o{ CorrectionSuggestion : has
    Question ||--o{ Solution : has
    Question ||--o{ Comment : has
    Exam ||--o{ UserAnswer : tracks
    Exam ||--o{ ExamAttempt : produces
    Exam ||--o{ PracticeSession : produces
    User ||--o{ ExamAttempt : takes
    User ||--o{ PracticeSession : takes
    User ||--o{ UserAnswer : submits
    ExamRoadmap ||--o{ RoadmapPhase : has
    ExamRoadmap }o--o{ User : bookmarked_by
    RoadmapPhase ||--o{ RoadmapTopic : has
    RoadmapTopic }o--o{ RoadmapTopic : prerequisites
    RoadmapTopic ||--o{ TopicResource : has
    RoadmapTopic ||--o{ UserTopicProgress : tracked_by
    TopicResource }o--o{ ResourceTag : tagged
    TopicResource ||--o{ ResourceProgress : tracked_by
    TopicResource ||--o{ ResourceBookmark : bookmarked_by
    User ||--o| Profile : has
    User ||--o| UserSettings : has
    User ||--o{ UserBadge : earns
    Badge ||--o{ UserBadge : awarded_as
    User ||--o{ Solution : posts
    Solution ||--o{ SolutionUpvote : receives
    Solution ||--o{ Comment : has
    Comment ||--o{ Comment : replies_to
    Comment ||--o{ CommentUpvote : receives
    User ||--o{ Notification : receives
    User ||--o{ ContributorActivity : generates
    Category ||--o{ CurrentAffair : categorizes
    User ||--o{ QuestionPaperUpload : uploads
    Category ||--o{ QuestionPaperUpload : tagged
```


# Diagram 7: CI/CD Pipeline

```mermaid
flowchart LR
    subgraph Dev["Developer Machine"]
        Code["Write Code"]
        LocalTest["Local Tests<br/>pytest · jest<br/>test_models.py<br/>test_negative_marks.py<br/>test_compile.py"]
        Git["git push origin main"]
    end

    subgraph BuildPhase["Build Phase (VPS)"]
        BuildSH["build.sh<br/>pip install -r requirements.txt<br/>collectstatic --noinput<br/>migrate"]
        DockerBuildBE["docker build<br/>backend/Dockerfile<br/>→ Django image"]
        DockerBuildFE["docker build<br/>frontend/Dockerfile.prod<br/>ARG: NEXT_PUBLIC_API_BASE_URL<br/>→ Next.js image"]
    end

    subgraph DeployPhase["Deploy Phase"]
        ComposeUp["docker-compose -f docker-compose.prod.yml up -d"]
        Entrypoint["entrypoint.sh<br/>wait-for-db<br/>migrate<br/>collectstatic"]
        Services["9 services started:<br/>backend · frontend<br/>5 celery workers<br/>beat · flower · redis"]
    end

    subgraph RunningStack["Running Stack"]
        Gunicorn["Gunicorn 3 workers<br/>core.wsgi:application<br/>0.0.0.0:8000"]
        NextProd["Next.js prod server<br/>0.0.0.0:4005"]
        CeleryProcs["5 specialized Celery workers<br/>+ beat scheduler"]
        RedisLocal["Redis 7 Alpine<br/>maxmemory: 256mb<br/>allkeys-lru"]
        FlowerUI["Flower :5555<br/>basic auth"]
    end

    Code --> LocalTest --> Git
    Git --> BuildSH
    BuildSH --> DockerBuildBE & DockerBuildFE
    DockerBuildBE & DockerBuildFE --> ComposeUp
    ComposeUp --> Entrypoint --> Services
    Services --> Gunicorn & NextProd & CeleryProcs & RedisLocal & FlowerUI
```

# Diagram 8: Deployment Architecture

```mermaid
graph TB
    subgraph Internet["Internet"]
        Client["Client Browser"]
    end

    subgraph VPS["Hostinger VPS (Ubuntu)"]
        Nginx["Nginx<br/>SSL Termination<br/>api.examintel.in → :9000<br/>examintel.in → :4005<br/>Serves /media/ static files"]

        subgraph DockerNet["Docker Network (docker-compose.prod.yml)"]
            subgraph AppServices["Application Services"]
                BackendC["backend<br/>Django + Gunicorn<br/>127.0.0.1:9000→:8000<br/>3 workers"]
                FrontendC["frontend<br/>Next.js prod<br/>127.0.0.1:4005→:4005<br/>NODE_ENV=production"]
            end

            subgraph CeleryServices["Celery Services"]
                SummaryWC["summary_worker<br/>Q: normal,low<br/>concurrency: 2"]
                RoadmapWC["roadmap_worker<br/>Q: normal,maintenance<br/>threads · conc: 4"]
                PDFWC["pdf_worker<br/>Q: high,normal<br/>threads · conc: 4"]
                AnalyticsWC["analytics_worker<br/>Q: low,maintenance<br/>threads · conc: 4"]
                NotifWC["notification_worker<br/>Q: high<br/>threads · conc: 4"]
                BeatC["beat<br/>DatabaseScheduler"]
                FlowerC["flower<br/>127.0.0.1:5555→:5555<br/>admin:Admin@examintel123"]
            end

            RedisC["redis:7-alpine<br/>DB0: broker+results<br/>DB1: cache (256mb, allkeys-lru)<br/>DB2: sessions<br/>volume: redis_data"]
        end

        subgraph Volumes["Docker Volumes"]
            MediaMount["/var/www/examintel/media<br/>shared by backend + all workers"]
            StaticVol["django_prod_static<br/>served by Nginx via whitenoise"]
        end
    end

    subgraph CloudServices["Cloud Services (External)"]
        NeonDB["Neon PostgreSQL<br/>DATABASE_URL env var<br/>conn_max_age: 600<br/>health_checks: true"]
        UpstashRedis["Upstash Redis (optional)<br/>rediss:// SSL<br/>ssl_cert_reqs: NONE"]
        GeminiAPI["Google Gemini API<br/>gemini-2.5-flash (primary)<br/>gemini-2.5-pro (fallback)"]
        RSSFeeds["RSS Feeds<br/>8 Indian news sources"]
    end

    Client -->|HTTPS| Nginx
    Nginx -->|"/api/* · /admin/* · /health/*"| BackendC
    Nginx -->|"/*"| FrontendC
    BackendC --> NeonDB
    BackendC --> RedisC
    CeleryServices --> RedisC
    CeleryServices --> NeonDB
    BackendC -->|"AI calls"| GeminiAPI
    CeleryServices -->|"AI tasks"| GeminiAPI
    BeatC -->|"06:00 daily"| SummaryWC
    SummaryWC -->|"fetch_current_affairs"| RSSFeeds
    BackendC --- MediaMount
    CeleryServices --- MediaMount
```


