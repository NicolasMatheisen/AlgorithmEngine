export function generateHTML(algorithmsByTopic) {
	let html = `<!DOCTYPE html>
                <html>
                    <head>
                        <title>Inhaltsverzeichnis</title>
                        <link rel="stylesheet" href="style.css">
                    </head>
                    <body>
                        <h1>Algorithm Overview</h1>
                    `;

                        Object.entries(algorithmsByTopic).forEach(([topic, files]) => {
                            html += `\t<h2>${topic} - Algorithm</h2>\n\t<ul>\n`;
                            
                            files.forEach(file => {
                                html += `\t\t<li><a href="${file}">${file}</a></li>\n`;
                            });
                            
                            html += `\t</ul>\n`;
                        });

                        html += `
                    </body>
                </html>`;

	return html;
}
