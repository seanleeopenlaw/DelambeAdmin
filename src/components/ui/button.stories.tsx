import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Plus, Download, Edit, Trash2, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Unified button system with 4 variants covering all use cases: Primary, Secondary, Ghost, and Danger',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic buttons
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Create Work',
  },
  parameters: {
    docs: {
      description: {
        story: 'For main actions. Used for create, save, confirm and other important actions',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
  parameters: {
    docs: {
      description: {
        story: 'For secondary actions. Used for cancel, edit, back and similar actions. Same as the previous outline variant',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'More',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal emphasis. Used for icon buttons, navigation, and text actions',
      },
    },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story: 'For dangerous actions. Used for delete, reset and other irreversible actions',
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">
        <Plus className="h-4 w-4" />
        New Work
      </Button>
      <Button variant="secondary">
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <Button variant="ghost">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="danger">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world use cases - icon usage examples for each variant',
      },
    },
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="sm">
        Small Button
      </Button>
      <Button variant="primary" size="default">
        Default Button
      </Button>
      <Button variant="primary" size="lg">
        Large Button
      </Button>
      <Button variant="ghost" size="icon">
        <Plus />
      </Button>
    </div>
  ),
};

// Real UI patterns
export const ModalActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Create Work</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button combination pattern used in modals',
      },
    },
  },
};

export const DangerAction: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">
        <Trash2 className="h-4 w-4" />
        Permanently Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog pattern for dangerous actions',
      },
    },
  },
};

export const NavigationButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">Back</Button>
      <Button variant="ghost" size="sm">
        Next
        <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation ghost button usage examples',
      },
    },
  },
};

// All combinations test
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="ghost" disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All variants and disabled states overview',
      },
    },
  },
};