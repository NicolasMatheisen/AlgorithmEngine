export function generateHTML(algorithmsByTopic) {
	let html = `<!DOCTYPE html>
                <html>
                    <head>
                        <title>Inhaltsverzeichnis</title>
                    </head>
                    <body>
                        <h1>Algorithm Overview</h1>
                    `;

                        Object.entries(algorithmsByTopic).forEach(([topic, files]) => {
                            html += `\t<h2>Topic: ${topic}</h2>\n\t<ul>\n`;
                            
                            files.forEach(file => {
                                html += `\t\t<li>${file}</li>\n`;
                            });
                            
                            html += `\t</ul>\n`;
                        });

                        html += `
                    </body>
                </html>`;

	return html;
}