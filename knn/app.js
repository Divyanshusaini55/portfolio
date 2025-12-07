
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting KNN Tutorial initialization...');

    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    setTimeout(() => {
        new KNNTutorial();
    }, 100);
});

class KNNTutorial {
    constructor() {
        console.log('KNNTutorial constructor called');
        
        this.datasets = {
            "blobs": {
                "X": [[-1.3570075134214683, 9.440701524341474], [-0.25251206315045666, 9.721267828415866], [1.7640522855753818, 8.006561882050486], [-1.0856306033005612, 10.442564192037928], [0.3190391070486223, 8.79075293806098], [1.2030361843807653, 10.405015669142923], [2.4144979115889507, 8.835262230345056], [2.7913314169012473, 9.619712833314924], [2.122167417413746, 8.778722125330129], [1.9441678029560513, 9.470016124946804], [1.9044065001031263, 8.27925936346145], [1.7833103067061625, 8.804614278009636], [-0.12289024106983668, 9.36312334802104], [2.387245421854558, 9.363946958074226], [2.1055893610269924, 7.935067473071507], [1.3769627687892273, 9.08299755973006], [1.9557404503477858, 8.887486690014127], [-1.270485756795049, 10.249533022308063], [0.4000571781687103, 10.362272058095063], [0.9507143064099162, 9.508808683852507], [1.6160862735631956, 8.75584372880166], [1.3328839825486055, 8.943211053047267], [1.2371064446470983, 8.395605624163016], [0.6508628024088952, 8.79075293806098], [1.6505280063050434, 9.62764000654003], [1.8963175354780906, 9.36312334802104], [2.0786829070606866, 8.914055781398706], [0.33470709255739315, 8.395605624163016], [2.1400311938588403, 8.306099353514454], [0.8617577391517641, 8.670246666452299], [2.4300397443208985, 8.306099353514454], [1.8773820030942653, 8.38767845093791], [1.1007651791726462, 9.16878103618162], [0.7009136372267433, 9.16878103618162], [2.5934635115770504, 9.256080024153691], [0.16795575538086754, 8.835262230345056], [1.5715444407213479, 8.41974127770281], [2.4989616467372234, 9.621173915332845], [2.7624058844173218, 8.618933481808739], [1.6193971081380211, 9.509347774060693], [2.5889217787351024, 8.492076108100298], [1.6972608056302778, 8.595142935161179], [0.6286837368838203, 8.306099353514454], [0.5606847369837207, 9.509347774060693], [-0.01942605778565188, 8.79075293806098], [0.7320190695106689, 8.914055781398706], [0.5785638025086463, 9.509347774060693], [2.4767188099459739, 9.256080024153691], [1.8351693371379594, 8.618933481808739], [0.9451725735680684, 9.256080024153691], [2.2656803594839148, 8.306099353514454], [1.1674444447977206, 8.306099353514454], [2.3228036890126105, 8.618933481808739], [0.17016629860925008, 9.16878103618162], [0.4789825832369623, 10.362272058095063], [1.4591737033641528, 8.914055781398706], [2.2768448270000888, 9.16878103618162], [1.5326889082374221, 8.492076108100298], [-0.07275806227687096, 10.442564192037928], [1.4814846378391786, 8.395605624163016], [2.0064718725857609, 9.440701524341474], [2.155585028984365, 8.835262230345056], [-1.5348105466572627, 10.442564192037928], [0.8584467046768387, 9.256080024153691], [1.8685374456782907, 8.748773543157179], [0.7453300040856941, 8.492076108100298], [1.3373257153804533, 8.595142935161179], [-0.9500083697356357, 9.559554045668375], [2.6213425770965026, 8.79075293806098], [-1.2015612243111235, 9.16878103618162], [0.8772912371607642, 8.748773543157179], [2.4522606788958243, 8.943211053047267], [1.4813179713808265, 8.670246666452299], [0.8328494391016642, 8.748773543157179], [0.7131081350357432, 9.16878103618162], [1.1785089123138947, 8.395605624163016], [0.6564045352407431, 8.835262230345056]],
                "y": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "name": "Simple Clusters"
            },
            "moons": {
                "X": [[-0.06073895765441865, 0.8574306978767103], [-0.3411158847847289, 0.24770271031829418], [-0.7612069362042736, -0.3232425524641837], [0.4036872041479439, -0.4033206325650976], [-1.0182755352475617, 0.12992441433491444], [0.9746810956394978, 0.4662770395424728], [-0.9080240755230468, -0.06788735032181394], [-0.6890814758911803, -0.35070598967399264], [-0.8023950220541148, -0.26799025835160315], [-0.8806756923506774, -0.1470050502451226], [-0.5738916256064829, -0.4041336866901952], [1.1223050653088943, 0.2508853103779894], [-0.8890636759027832, -0.09688138308965113], [-1.0126133084295698, 0.09659866693985844], [0.8845851063424829, -0.43670042205832063], [0.8998041002249736, -0.4346862009395103], [1.0147065152654853, -0.5066397693655962], [0.9969211507853844, 0.45901779088008604], [-1.0135648301698998, 0.11003297695671297], [0.9639516169838095, 0.4583779424647302], [0.6775845765516046, -0.42542488698066285], [-0.5970715433147847, -0.4011616806529084], [0.7574449877977406, 0.6151068652003988], [1.0264976641166032, 0.6228430058985085], [0.9997262866153655, 0.48006669830797655], [-0.8924618948936936, -0.13160329854632638], [0.9895736066297142, -0.475632001853959], [0.7574449877977406, 0.5870685062003988], [0.8997262866153655, 0.41006669830797655], [-0.7612069362042736, -0.3232425524641837]],
                "y": [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
                "name": "Two Moons"
            },
            "manual": {
                "height": [158, 158, 158, 160, 160, 163, 163, 160, 163, 165, 165, 165, 168, 168, 168, 170, 170, 170],
                "weight": [58, 59, 63, 59, 60, 60, 61, 64, 64, 61, 62, 65, 62, 63, 66, 63, 64, 68],
                "tshirt_size": ["M", "M", "M", "M", "M", "M", "M", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"]
            }
        };

        this.currentK = 5;
        this.currentDataset = 'blobs';
        this.demoChart = null;
        this.accuracyChart = null;
        this.complexityChart = null;
        
        this.init();
    }

    init() {
        console.log('Initializing KNN Tutorial...');
        this.setupTabNavigation();
        this.populateTrainingTable();
        this.setupInteractiveDemo();
        this.setupStepByStepExample();
    }

    setupTabNavigation() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        console.log('Found', tabBtns.length, 'tab buttons and', tabContents.length, 'content sections');

        if (tabBtns.length === 0) {
            console.error('No tab buttons found!');
            return;
        }

        tabBtns.forEach((btn, index) => {
            const targetTab = btn.getAttribute('data-tab');
            console.log(`Setting up tab button ${index}: ${targetTab}`);
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Tab clicked:', targetTab);
                
            
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
        
                btn.classList.add('active');
            
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Successfully activated tab:', targetTab);
                    this.handleTabActivation(targetTab);
                } else {
                    console.error('Target content not found for tab:', targetTab);
                }
            });
        });

        console.log('Tab navigation setup complete');
    }

    handleTabActivation(tabName) {
        switch(tabName) {
            case 'demo':
                setTimeout(() => this.initDemoVisualization(), 200);
                break;
            case 'performance':
                setTimeout(() => this.initPerformanceCharts(), 200);
                break;
            case 'example':
                setTimeout(() => this.populateTrainingTable(), 100);
                break;
        }
    }

    setupInteractiveDemo() {

        console.log('Interactive demo setup ready');
    }

    initDemoVisualization() {
        console.log('Initializing demo visualization...');
        const canvas = document.getElementById('demoChart');
        if (!canvas) {
            console.log('Demo chart canvas not found, will try again later');
            return;
        }
        this.setupDemoControls();

        const ctx = canvas.getContext('2d');
        
        if (this.demoChart) {
            this.demoChart.destroy();
        }
        
        this.demoChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'KNN Classification Demo'
                    },
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Feature 1'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Feature 2'
                        }
                    }
                }
            }
        });

        this.updateDemoVisualization();
        console.log('Demo visualization initialized');
    }

    setupDemoControls() {
        const datasetSelect = document.getElementById('datasetSelect');
        const kSlider = document.getElementById('kSlider');
        const kValue = document.getElementById('kValue');
        const currentK = document.getElementById('currentK');
        const resetBtn = document.getElementById('resetDemo');

        if (datasetSelect) {
            datasetSelect.addEventListener('change', (e) => {
                this.currentDataset = e.target.value;
                this.updateDemoVisualization();
            });
        }

        if (kSlider) {
            kSlider.addEventListener('input', (e) => {
                this.currentK = parseInt(e.target.value);
                if (kValue) kValue.textContent = this.currentK;
                if (currentK) currentK.textContent = this.currentK;
                this.updateDemoVisualization();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.updateDemoVisualization();
            });
        }

        console.log('Demo controls setup complete');
    }

    updateDemoVisualization() {
        if (!this.demoChart) return;

        const dataset = this.datasets[this.currentDataset];
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'];
    
        const chartDatasets = [];
        const uniqueLabels = [...new Set(dataset.y)];

        uniqueLabels.forEach((label, index) => {
            const points = dataset.X.filter((_, i) => dataset.y[i] === label);
            chartDatasets.push({
                label: `Class ${label}`,
                data: points.map(point => ({ x: point[0], y: point[1] })),
                backgroundColor: colors[index % colors.length],
                borderColor: colors[index % colors.length],
                pointRadius: 6,
                pointHoverRadius: 8
            });
        });

        this.demoChart.data.datasets = chartDatasets;
        this.demoChart.update();
        const trainingCount = document.getElementById('trainingCount');
        if (trainingCount) {
            trainingCount.textContent = dataset.X.length;
        }
    }

    setupStepByStepExample() {
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateStepByStepPrediction();
            });
            console.log('Step-by-step example setup complete');
        }
    }

    populateTrainingTable() {
        const tbody = document.getElementById('trainingTable');
        if (!tbody) return;
        
        const manual = this.datasets.manual;
        
        tbody.innerHTML = manual.height.map((height, index) => `
            <tr>
                <td>${height}</td>
                <td>${manual.weight[index]}</td>
                <td><span class="status status--${manual.tshirt_size[index] === 'M' ? 'info' : 'success'}">${manual.tshirt_size[index]}</span></td>
            </tr>
        `).join('');
        
        console.log('Training table populated');
    }

    euclideanDistance(point1, point2) {
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
    }

    calculateStepByStepPrediction() {
        const heightInput = document.getElementById('heightInput');
        const weightInput = document.getElementById('weightInput');
        const kInput = document.getElementById('kInputExample');
        const resultsDiv = document.getElementById('calculationResults');

        if (!heightInput || !weightInput || !kInput || !resultsDiv) {
            console.log('Step-by-step elements not found');
            return;
        }

        const height = parseInt(heightInput.value);
        const weight = parseInt(weightInput.value);
        const k = parseInt(kInput.value);

        const manual = this.datasets.manual;
        const testPoint = [height, weight];
        
        const distances = manual.height.map((h, index) => {
            const trainingPoint = [h, manual.weight[index]];
            const distance = this.euclideanDistance(testPoint, trainingPoint);
            return {
                point: trainingPoint,
                distance: distance,
                label: manual.tshirt_size[index],
                index: index + 1
            };
        });
        distances.sort((a, b) => a.distance - b.distance);
        const kNearest = distances.slice(0, k);
        const votes = {};
        kNearest.forEach(neighbor => {
            votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
        });

       
        const prediction = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
     
        let html = `
            <h4>Calculation Steps:</h4>
            <p><strong>Test Point:</strong> Height = ${height}cm, Weight = ${weight}kg</p>
            <h5>Distance Calculations:</h5>
        `;

        distances.slice(0, Math.min(10, distances.length)).forEach(d => {
            html += `
                <div class="distance-calculation">
                    Point ${d.index}: (${d.point[0]}, ${d.point[1]}) → Distance = ${d.distance.toFixed(2)}, Label = ${d.label}
                </div>
            `;
        });

        html += `
            <h5>K=${k} Nearest Neighbors:</h5>
        `;

        kNearest.forEach(neighbor => {
            html += `
                <div class="distance-calculation">
                    Distance: ${neighbor.distance.toFixed(2)} → Label: ${neighbor.label}
                </div>
            `;
        });

        html += `
            <h5>Voting Results:</h5>
            <div class="distance-calculation">
                ${Object.entries(votes).map(([label, count]) => `${label}: ${count} vote(s)`).join(', ')}
            </div>
            <div class="prediction-result">
                Predicted T-shirt Size: ${prediction}
            </div>
        `;

        resultsDiv.innerHTML = html;
        console.log('Step-by-step prediction calculated');
    }

    initPerformanceCharts() {
        console.log('Initializing performance charts...');
        this.initAccuracyChart();
        this.initComplexityChart();
    }

    initAccuracyChart() {
        const canvas = document.getElementById('accuracyChart');
        if (!canvas) {
            console.log('Accuracy chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        const kValues = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        const accuracies = [0.76, 0.82, 0.88, 0.91, 0.89, 0.87, 0.85, 0.83, 0.81, 0.79];

        if (this.accuracyChart) {
            this.accuracyChart.destroy();
        }

        this.accuracyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: kValues,
                datasets: [{
                    label: 'Classification Accuracy',
                    data: accuracies,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#1FB8CD',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Accuracy vs K Value'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'K Value'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Accuracy'
                        },
                        min: 0.7,
                        max: 1.0
                    }
                }
            }
        });

        console.log('Accuracy chart initialized');
    }

    initComplexityChart() {
        const canvas = document.getElementById('complexityChart');
        if (!canvas) {
            console.log('Complexity chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        const datasetSizes = [100, 500, 1000, 2000, 5000, 10000];
        const timings = [0.1, 0.8, 2.1, 5.8, 18.2, 42.5];

        if (this.complexityChart) {
            this.complexityChart.destroy();
        }

        this.complexityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datasetSizes,
                datasets: [{
                    label: 'Prediction Time (ms)',
                    data: timings,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#FFC185',
                    pointBorderColor: '#FFC185',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Computational Complexity'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Dataset Size'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Time (ms)'
                        }
                    }
                }
            }
        });

        console.log('Complexity chart initialized');
    }
}