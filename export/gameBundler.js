// gameBundler.js - Pack game configuration, metadata, and assets into a downloadable zip file (Pure JavaScript / No HTML generator)

async function exportGamePackage(gameDetails) {
    // Destructure parameters with default fallback values if fields are missing
    const {
        gameTitle = "Untitled Game",
        author = "Unknown Author",
        version = "1.0.0",
        description = "A game created with our engine",
        assets = [] // Array of asset objects: { name: "path/file.json", data: "..." }
    } = gameDetails;

    try {
        console.log(`Packaging game: "${gameTitle}" by ${author}...`);

        // 1. Build the game configuration and manifest JSON
        const gameConfig = {
            title: gameTitle,
            author: author,
            version: version,
            description: description,
            createdAt: new Date().toISOString(),
            resolution: { width: 800, height: 600 },
            fps: 60
        };

        // 2. Generate engine runner script using the parameters
        const gameScript = `
            // Auto-generated engine runtime script
            const gameConfig = ${JSON.stringify(gameConfig, null, 2)};
            console.log("Loading game: " + gameConfig.title + " v" + gameConfig.version);
            console.log("Created by: " + gameConfig.author);

            function startEngine() {
                console.log("Engine started successfully for " + gameConfig.title);
            }

            // Automatically kick off runtime logic
            startEngine();
        `;

        // 3. Initialize zip.js writers
        const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

        // 4. Write core project configuration and logic files into the zip archive
        await zipWriter.add("config.json", new zip.TextReader(JSON.stringify(gameConfig, null, 2)));
        await zipWriter.add("game.js", new zip.TextReader(gameScript));

        // 5. Loop through and dynamically add any passed custom assets (data, scripts, configs)
        for (const asset of assets) {
            if (asset.name && asset.data) {
                await zipWriter.add(asset.name, new zip.TextReader(asset.data));
                console.log(`Added asset: ${asset.name}`);
            }
        }

        // 6. Finalize the archive and get the generated Blob
        const zipBlob = await zipWriter.close();
        console.log("Game package zip created successfully!");

        // 7. Generate a safe filename based on the game title
        const safeFilename = `${gameTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_v${version}.zip`;

        // 8. Trigger browser download
        downloadZipFile(zipBlob, safeFilename);

    } catch (error) {
        console.error("Failed to package game configuration:", error);
    }
}

// Helper utility to trigger browser file download
function downloadZipFile(blob, filename) {
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    
    anchor.href = downloadUrl;
    anchor.download = filename;
    
    document.body.appendChild(anchor);
    anchor.click();
    
    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
}
