const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      shell: false,
      windowsHide: true,
      cwd: __dirname
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({
        code,
        stdout,
        stderr
      });
    });
  });
}

app.post("/run-code", async (req, res) => {
  const { code, language } = req.body || {};

  if (!code || !code.trim()) {
    return res.status(400).json({
      success: false,
      error: "No code provided."
    });
  }

  const selectedLanguage = language || "javascript";
  const tempFolder = path.join(__dirname, "temp");

  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, { recursive: true });
  }

  try {
    if (selectedLanguage === "javascript") {
      const filePath = path.join(tempFolder, "code.js");
      fs.writeFileSync(filePath, code, "utf8");

      const result = await runCommand("node", [filePath]);

      if (result.code !== 0) {
        return res.status(400).json({
          success: false,
          error: result.stderr || result.stdout || "JavaScript execution failed."
        });
      }

      return res.json({
        success: true,
        output: result.stdout || "JavaScript code executed successfully."
      });
    }

    if (selectedLanguage === "python") {
      const filePath = path.join(tempFolder, "code.py");
      fs.writeFileSync(filePath, code, "utf8");

      const result = await runCommand("python", [filePath]);

      if (result.code !== 0) {
        return res.status(400).json({
          success: false,
          error: result.stderr || result.stdout || "Python execution failed."
        });
      }

      return res.json({
        success: true,
        output: result.stdout || "Python code executed successfully."
      });
    }

    if (selectedLanguage === "cpp") {
      const sourcePath = path.join(tempFolder, "code.cpp");
      const exePath = path.join(tempFolder, "code.exe");
      fs.writeFileSync(sourcePath, code, "utf8");

      const compilerCandidates = ["g++", "clang++", "c++"];
      let compilerUsed = null;
      let compilerResult = null;

      for (const compiler of compilerCandidates) {
        const check = await runCommand("where", [compiler]);
        if (check.stdout && check.stdout.trim()) {
          compilerUsed = compiler;
          break;
        }
      }

      if (!compilerUsed) {
        return res.status(400).json({
          success: false,
          error: "C++ compiler not found on this machine. Install MinGW-w64 or MSYS2 and make sure g++ is in PATH."
        });
      }

      compilerResult = await runCommand(compilerUsed, [sourcePath, "-o", exePath]);

      if (compilerResult.code !== 0) {
        return res.status(400).json({
          success: false,
          error: compilerResult.stderr || compilerResult.stdout || "C++ compilation failed."
        });
      }

      const runResult = await runCommand(exePath, []);

      if (runResult.code !== 0) {
        return res.status(400).json({
          success: false,
          error: runResult.stderr || runResult.stdout || "C++ program failed at runtime."
        });
      }

      return res.json({
        success: true,
        output: runResult.stdout || "C++ code executed successfully."
      });
    }

    return res.status(400).json({
      success: false,
      error: "Unsupported programming language."
    });
  } catch (error) {
    console.error("run-code error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Unknown execution error."
    });
  }
});

app.listen(PORT, () => {
  console.log("=================================");
  console.log("     INTERVIEW CODE RUNNER");
  console.log("=================================");
  console.log(`Server running at: http://localhost:${PORT}`);
});