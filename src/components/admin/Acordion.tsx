// Accordion.js
import React, { ReactNode, useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (

      <div className="border-b overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-blue-700 text-white rounded-t-lg"
          onClick={toggleAccordion}
        >
          <div>{title}</div>
          <div>{isOpen ? '🔽' : '🔼'}</div>
        </div>
        {isOpen && <div className="p-4">{children}</div>}
      </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { key: index });
        }
        return null;
      })}
    </div>
  );
};

export { Accordion, AccordionItem };
