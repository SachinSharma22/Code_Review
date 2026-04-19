import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import "github-markdown-css/github-markdown-dark.css";
import Prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import axios from "axios";
import EditorImport from "react-simple-code-editor";

const Editor = EditorImport.default || EditorImport;
import "prismjs/components/prism-javascript";

import { useState } from "react";

function App() {
  const [code, setCode] = useState(`
                function sum() {
                return 1 + 1;
                }
                `);
  const [review, setReview] = useState("");

  async function reviewCode() {
    const response = await axios.post("http://localhost:4000/ai/get-review", {
      code,
    });

    setReview(response.data);
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                minHeight: "300px",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <div className="right markdown-body">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {review}
            </Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
