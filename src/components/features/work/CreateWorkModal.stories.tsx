import type { Meta, StoryObj } from '@storybook/react';
import { CreateWorkModal } from './CreateWorkModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof CreateWorkModal> = {
  title: 'Features/Work/CreateWorkModal',
  component: CreateWorkModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'GenericModal을 사용한 작품 생성 모달의 마이그레이션 예시',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    const handleSubmit = (data: any) => {
      console.log('작품 생성 데이터:', data);
      alert(`작품 "${data.title}"이 생성되었습니다!`);
    };
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          작품 생성 모달 열기
        </Button>
        
        <CreateWorkModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 작동하는 CreateWorkModal 예시. GenericModal + FormField + DynamicFieldList 조합 사용',
      },
    },
  },
};

export const WithInitialData: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    
    const handleSubmit = (data: any) => {
      console.log('수정된 작품 데이터:', data);
    };
    
    return (
      <CreateWorkModal
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모달이 열린 상태로 표시되는 예시',
      },
    },
  },
};