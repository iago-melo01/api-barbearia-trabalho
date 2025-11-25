import './Table.css';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <div className="table-container">
      <table className={`table ${className}`}>{children}</table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  return <thead className="table-header">{children}</thead>;
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
  return <tbody className="table-body">{children}</tbody>;
};

interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const TableRow = ({ children, onClick, className = '' }: TableRowProps) => {
  return (
    <tr className={`table-row ${onClick ? 'clickable' : ''} ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}

export const TableCell = ({ children, header = false, className = '' }: TableCellProps) => {
  const Component = header ? 'th' : 'td';
  return <Component className={`table-cell ${className}`}>{children}</Component>;
};

