import type { Meta, StoryObj } from '@storybook/react';
import { StatsGrid } from './StatsGrid';
import { FileText, BookOpen, Users, Clock } from 'lucide-react';

const meta: Meta<typeof StatsGrid> = {
  title: 'Design System/Molecules/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reusable component for displaying statistics in grid format. Eliminates duplication across progress/stats sections in View pages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: [
      { label: 'Total Items', value: 42, color: 'primary' },
      { label: 'Completed', value: 28, color: 'secondary' },
      { label: 'In Progress', value: 14, color: 'tertiary' },
    ],
    columns: 3,
  },
};

export const EditionProgress: Story = {
  args: {
    stats: [
      { label: 'Active Drafts', value: 3, color: 'primary' },
      { label: 'Chapters', value: 12, color: 'secondary' },
      { label: 'Completion', value: 78, color: 'tertiary', suffix: '%' },
    ],
    columns: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example recreating the progress overview from Edition View',
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    stats: [
      { 
        label: 'Total Files', 
        value: 156, 
        color: 'primary',
        icon: <FileText className="h-4 w-4" />
      },
      { 
        label: 'Published Works', 
        value: 23, 
        color: 'secondary',
        icon: <BookOpen className="h-4 w-4" />
      },
      { 
        label: 'Contributors', 
        value: 8, 
        color: 'tertiary',
        icon: <Users className="h-4 w-4" />
      },
      { 
        label: 'Hours Saved', 
        value: 142, 
        color: 'quaternary',
        icon: <Clock className="h-4 w-4" />
      },
    ],
    columns: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Statistics grid example with icons',
      },
    },
  },
};

export const TwoColumn: Story = {
  args: {
    stats: [
      { label: 'Word Count', value: '125,000', color: 'secondary' },
      { label: 'Last Updated', value: '2 days ago', color: 'primary' },
    ],
    columns: 2,
  },
};

export const SingleColumn: Story = {
  args: {
    stats: [
      { label: 'Project Progress', value: 85, color: 'secondary', suffix: '%' },
    ],
    columns: 1,
  },
};

export const PublisherDashboard: Story = {
  args: {
    stats: [
      { label: 'Total Works', value: 47, color: 'primary' },
      { label: 'Published This Month', value: 8, color: 'secondary' },
      { label: 'In Review', value: 12, color: 'tertiary' },
      { label: 'Revenue', value: '$24,500', color: 'quaternary' },
    ],
    columns: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Statistics example for publisher dashboard usage',
      },
    },
  },
};