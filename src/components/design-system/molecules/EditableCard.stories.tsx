import type { Meta, StoryObj } from '@storybook/react';
import { EditableCard } from './EditableCard';
import { Hash, Users, Languages, DollarSign } from 'lucide-react';

const meta: Meta<typeof EditableCard> = {
  title: 'Design System/Molecules/EditableCard',
  component: EditableCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reusable card component with editable fields. Reduces duplication across View pages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconColor: {
      control: { type: 'select' },
      options: ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHandleSave = (field: string, value: string | number) => {
  console.log(`Saving ${field}:`, value);
};

export const Default: Story = {
  args: {
    title: 'Basic Information',
    fields: [
      {
        key: 'title',
        label: 'Title',
        value: 'Sample Title',
        placeholder: 'Enter title...'
      },
      {
        key: 'description',
        label: 'Description',
        value: 'Sample description',
        type: 'textarea',
        placeholder: 'Enter description...'
      }
    ],
    onSave: mockHandleSave,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'ISBN Information',
    description: 'International Standard Book Number',
    icon: Hash,
    iconColor: 'text-blue-600',
    fields: [
      {
        key: 'isbn',
        label: '',
        value: '978-0-987654-32-1',
        variant: 'card',
        placeholder: 'Enter ISBN...'
      }
    ],
    onSave: mockHandleSave,
  },
};

export const WorkDetailsCard: Story = {
  args: {
    title: 'Target Audience',
    icon: Users,
    iconColor: 'text-green-600',
    fields: [
      {
        key: 'targetAudience',
        label: '',
        value: 'Legal professionals, Students, Researchers',
        variant: 'card',
        placeholder: 'e.g., Beginner developers'
      }
    ],
    onSave: mockHandleSave,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example recreating the card pattern used in Work View',
      },
    },
  },
};

export const PricingCard: Story = {
  args: {
    title: 'Pricing Information',
    description: 'Set the base price for this work',
    icon: DollarSign,
    iconColor: 'text-purple-600',
    fields: [
      {
        key: 'price',
        label: '',
        value: 189.99,
        type: 'number',
        className: 'text-2xl font-bold',
        placeholder: '0.00'
      }
    ],
    onSave: mockHandleSave,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example card for pricing configuration',
      },
    },
  },
};

export const MultipleFields: Story = {
  args: {
    title: 'Book Details',
    description: 'Complete book information',
    icon: Languages,
    iconColor: 'text-orange-600',
    fields: [
      {
        key: 'title',
        label: 'Book Title',
        value: 'Advanced React Patterns',
        placeholder: 'Enter book title...'
      },
      {
        key: 'language',
        label: 'Language',
        value: 'English',
        placeholder: 'Language'
      },
      {
        key: 'pages',
        label: 'Page Count',
        value: 324,
        type: 'number',
        placeholder: 'Number of pages'
      }
    ],
    onSave: mockHandleSave,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex card example with multiple fields',
      },
    },
  },
};