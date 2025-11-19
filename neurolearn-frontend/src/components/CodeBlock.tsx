interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
  return (
    <div className="bg-dark-bg p-4 rounded-lg my-4 border border-dark-border">
      <pre>
        <code className={`language-${language} text-sm text-accent-green`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
