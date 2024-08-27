import { useState, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathFormula = ({ text }: { text: string }) => {
  const [output, setOutput] = useState('');

  const loadModel = async () => {
    return {
      predict: (input: any) => {
        return input.map((str: any) => (/[\^\\]/.test(str) ? 'math' : 'text'));
      }
    };
  };

  const processText = async (inputText: any) => {
    const model = await loadModel();
    const parts = inputText.split(/(\s+)/);
    const predictions = model.predict(parts);

    const renderedOutput = parts.map((part: any, index: any) => {
      if (predictions[index] === 'math') {
        try {
          return katex.renderToString(part, { throwOnError: false });
        } catch (error) {
          return part;
        }
      }
      return part;
    }).join('');

    setOutput(renderedOutput);
  };

  useEffect(() => {
    processText(text);
  }, [text]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
};

export default MathFormula;
