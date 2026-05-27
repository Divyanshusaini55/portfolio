const fs = require('fs');
let c = fs.readFileSync('content/hope.md', 'utf8');

// The file currently has single $ for block math on their own lines.
// We want them to be $$
let lines = c.split('\n');
let newLines = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '$') {
        newLines.push('$$');
    } else {
        newLines.push(lines[i]);
    }
}
fs.writeFileSync('content/hope.md', newLines.join('\n'));
