import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsCard from '../components/StatsCard';
import { CheckCircle2 } from 'lucide-react';

describe('StatsCard', () => {
  it('renders title and value', () => {
    render(
      <StatsCard 
        title="Total Tasks" 
        value={25} 
        icon={CheckCircle2}
        color="primary"
      />
    );
    
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('displays trend when provided', () => {
    render(
      <StatsCard 
        title="Completed" 
        value={15} 
        icon={CheckCircle2}
        trend="+20%"
        color="success"
      />
    );
    
    expect(screen.getByText('+20%')).toBeInTheDocument();
  });

  it('does not display trend when not provided', () => {
    render(
      <StatsCard 
        title="Total" 
        value={10} 
        icon={CheckCircle2}
        color="primary"
      />
    );
    
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });
});
