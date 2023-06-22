// Simple react component that shows a markdown Markdown
// Toolbar has simple buttons like bold, header level and it just adds those to text and you can then
// type after it inserts those

import { useSignal } from "@preact/signals";

export default function MarkdownEditor() {
  const markdown = useSignal("");

  const addHeader = (level: number) => {
    for (let i = 0; i < level; i++) {
      markdown.value += "# ";
    }
  };

  const addBold = () => {
    markdown.value += "**";
  };

  const addLink = () => {
    markdown.value += "[]()";
  };

  const addCode = () => {
    markdown.value += "\n```\n```";
  };

  const addQuote = () => {
    markdown.value += "\n>";
  };

  return (
    <div>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Content
      </label>
      <div id="message" class="grid grid-cols-5 gap-2 mb-2">
        <div
          onClick={(_e) => addHeader(1)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H1
        </div>
        <div
          onClick={(_e) => addHeader(2)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H2
        </div>
        <div
          onClick={(_e) => addHeader(3)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H3
        </div>
        <div
          onClick={(_e) => addHeader(4)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H4
        </div>
        <div
          onClick={(_e) => addHeader(5)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H5
        </div>
        <div
          onClick={(_e) => addHeader(6)}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          H6
        </div>
        <div
          onClick={(_e) => addLink()}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          Link
        </div>
        <div
          onClick={(_e) => addBold()}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          Bold
        </div>
        <div
          onClick={(_e) => addCode()}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          Code
        </div>
        <div
          onClick={(_e) => addQuote()}
          class="text-gray-900 bg-gray-400 text-xs rounded-lg text-center p-2"
        >
          Quote
        </div>
      </div>
      <textarea
        type="message"
        id="message"
        name="message"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Add markdown here"
        value={markdown}
        rows={10}
        required
      />
    </div>
  );
}
