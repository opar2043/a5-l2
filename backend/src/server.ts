import app from "./app";

  
const PORT = process.env.PORT;

async function main() {
    try {
        console.log("Starting server...");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


main();


