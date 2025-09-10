import type { Meta, StoryObj } from '@storybook/react';
import { GenericModal } from './GenericModal';
import { Book, Settings, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof GenericModal> = {
  title: 'Design System/Organisms/GenericModal',
  component: GenericModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reusable generic modal component. Provides the basic structure for all modals.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Modal size setting',
    },
    iconColor: {
      control: { type: 'select' },
      options: ['text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic modal
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <GenericModal
        {...args}
        open={open}
        onOpenChange={setOpen}
        title="Basic Modal"
        onSubmit={() => console.log('Submitted')}
      >
        <p>Modal content goes here.</p>
      </GenericModal>
    );
  },
};

// Form modal example (replaces the existing CreateWorkModal)
export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    
    return (
      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="Create New Work"
        icon={Book}
        iconColor="text-blue-600"
        size="md"
        submitText="Create"
        submitDisabled={!title.trim()}
        onSubmit={() => {
          console.log('Work created:', { title, author });
        }}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter work title"
            />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>
        </div>
      </GenericModal>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real use case: Replacing the existing CreateWorkModal with GenericModal + basic Input combination',
      },
    },
  },
};

// Warning modal
export const WarningModal: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    
    return (
      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="Confirm Delete"
        icon={AlertTriangle}
        iconColor="text-red-600"
        size="sm"
        submitText="Delete"
        cancelText="Cancel"
        onSubmit={() => console.log('Deleted')}
      >
        <p className="text-sm text-gray-600">
          This action cannot be undone. Are you sure you want to delete?
        </p>
      </GenericModal>
    );
  },
};

// Settings modal  
export const SettingsModal: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [notifications, setNotifications] = useState(false);
    
    return (
      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="Settings"
        icon={Settings}
        iconColor="text-purple-600"
        size="lg"
        submitText="Save"
        onSubmit={() => console.log('Settings saved')}
      >
        <div className="space-y-4">
          <div>
            <Label>Notification Settings</Label>
            <div className="flex items-center space-x-2 mt-2">
              <input 
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="text-sm">Receive push notifications</span>
            </div>
          </div>
        </div>
      </GenericModal>
    );
  },
};