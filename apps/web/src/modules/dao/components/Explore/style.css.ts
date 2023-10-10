import { style } from '@vanilla-extract/css';

export const breakpoints = {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    
  };
  
export  const containerStyle = style({
    position: 'relative',
    overflowX: 'auto',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    [breakpoints.sm]: {
        borderRadius: '0.375rem',
      },
  });

export  const tableStyle = style({
    width: '100%',
    fontSize: '0.875rem',
    textAlign: 'left',
    color: 'blue-100',
    background: 'gray-700',
    [breakpoints.sm]: {
      borderRadius: '0.375rem',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
  });
  
export  const headerCellStyle = style({
    fontSize: '0.80rem', 
    color: 'Black',
    textTransform: 'uppercase',
    backgroundColor: 'gray-700',
    padding: '0.75rem 1.5rem',
    [breakpoints.sm]: {
        borderRadius: '0.375rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      },
    
  });
  
export  const cellStyle = style({
    padding: '0.75rem 1.5rem',
    background: 'white',
  });
  
export  const columnsStyle = style({
    backgroundColor: '#f0f5fa',
    borderBottom: '10px solid ',
    boxShadow: 'inset 1px 1px 1px #707070',

    
});
  
export  const columnStyle = style({
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500', 
    backgroundColor: 'gray-800',
    color: 'blue-50',
    whiteSpace: 'nowrap',
    
});

export const flexCenterStyle = style({
  display: 'flex',
  fontSize: '2rem',
  marginBottom: '0.80rem',
  justifyContent: 'center',
  alignItems: 'center',

  });

  export const centeredContainer = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });
  
  export const loader = style({
    margin: '20px',
  });

export  const SmtextStyle = style({
    fontSize: '0.8rem', 
    color: 'gray', 
    
  });

  export const container = style({
    display: 'flex',
    alignItems: 'center',
  });
  
  export const imgContainer = style({
    marginRight: '8px', 
  });
  
  export const textContainer = style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.75rem',
    marginLeft: '0.75rem',
  });