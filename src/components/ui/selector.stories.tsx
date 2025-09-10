import type { Meta, StoryObj } from '@storybook/nextjs';
import { Selector, SelectorOption } from './selector';
import { useState } from 'react';

const meta: Meta<typeof Selector> = {
  title: 'UI/Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { action: 'valueChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for different use cases
const publisherOptions: SelectorOption[] = [
  { value: 'delambre', label: 'Delambre Legal Publishers' },
  { value: 'west', label: 'West Academic Publishing' },
  { value: 'lexisnexis', label: 'LexisNexis' },
  { value: 'thomson', label: 'Thomson Reuters' },
];

const workOptions: SelectorOption[] = [
  { value: 'work-1', label: 'AIAJ Aboriginal Benchbook' },
  { value: 'work-2', label: 'National Domestic and Family Violence Bench Book' },
  { value: 'work-3', label: 'AI Decision-Making and the Courts Bench Book' },
];

const formatOptions: SelectorOption[] = [
  { value: 'hardcover', label: 'Hardcover' },
  { value: 'paperback', label: 'Paperback' },
  { value: 'ebook', label: 'E-book' },
  { value: 'audiobook', label: 'Audiobook' },
];

const statusOptions: SelectorOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'under-review', label: 'Under Review' },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Interactive wrapper for stories
function SelectorWrapper({ 
  options, 
  ...props 
}: { options: SelectorOption[] } & Partial<React.ComponentProps<typeof Selector>>) {
  const [value, setValue] = useState('');
  
  return (
    <div className="w-80">
      <Selector
        value={value}
        onValueChange={setValue}
        options={options}
        {...props}
      />
    </div>
  );
}

export const Publisher: Story = {
  render: () => (
    <SelectorWrapper 
      options={publisherOptions}
      label="Publisher"
      placeholder="Select publisher"
      required
    />
  ),
};

export const Work: Story = {
  render: () => (
    <SelectorWrapper 
      options={workOptions}
      label="Work"
      placeholder="Select work"
      required
    />
  ),
};

export const Format: Story = {
  render: () => (
    <SelectorWrapper 
      options={formatOptions}
      label="Format"
      placeholder="Select format"
    />
  ),
};

export const Status: Story = {
  render: () => (
    <SelectorWrapper 
      options={statusOptions}
      label="Status"
      placeholder="Select status"
      required
    />
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <SelectorWrapper 
      options={publisherOptions}
      placeholder="Select publisher"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <SelectorWrapper 
      options={publisherOptions}
      label="Publisher (Disabled)"
      placeholder="Select publisher"
      disabled
    />
  ),
};

export const Required: Story = {
  render: () => (
    <SelectorWrapper 
      options={workOptions}
      label="Work"
      placeholder="Select work"
      required
    />
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <SelectorWrapper 
      options={statusOptions}
      label="Status"
      placeholder="Select status"
    />
  ),
};