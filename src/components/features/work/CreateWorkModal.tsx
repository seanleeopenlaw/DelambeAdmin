import { useState } from 'react';
import { Book } from 'lucide-react';
import { GenericModal } from '@/components/design-system/organisms/GenericModal';
import { FormField } from '@/components/ui/form-field';
import { DynamicFieldList } from '@/components/ui/dynamic-field-list';

interface CreateWorkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WorkFormData) => void;
}

interface WorkFormData {
  title: string;
  authors: string[];
  isbn: string;
  targetAudience: string;
  language: string;
  price: number;
}

export function CreateWorkModal({ open, onOpenChange, onSubmit }: CreateWorkModalProps) {
  const [formData, setFormData] = useState<WorkFormData>({
    title: '',
    authors: [''],
    isbn: '',
    targetAudience: '',
    language: 'Korean',
    price: 0
  });

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit(formData);
      onOpenChange(false);
      // Reset form
      setFormData({
        title: '',
        authors: [''],
        isbn: '',
        targetAudience: '',
        language: 'Korean',
        price: 0
      });
    }
  };

  const updateField = (field: keyof WorkFormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title="새 작품 생성"
      icon={Book}
      iconColor="text-blue-600"
      size="md"
      submitText="작품 생성"
      submitDisabled={!formData.title.trim()}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <FormField
          type="text"
          label="제목"
          value={formData.title}
          onChange={updateField('title')}
          placeholder="작품 제목을 입력하세요"
          required
        />

        <DynamicFieldList
          label="저자"
          values={formData.authors}
          onChange={updateField('authors')}
          placeholder="저자명을 입력하세요"
          required
          addButtonText="저자 추가"
        />

        <FormField
          type="text"
          label="ISBN"
          value={formData.isbn}
          onChange={updateField('isbn')}
          placeholder="978-89-1234-567-8"
        />

        <FormField
          type="text"
          label="대상 독자"
          value={formData.targetAudience}
          onChange={updateField('targetAudience')}
          placeholder="예: 법무 전문가, 학생"
        />

        <FormField
          type="select"
          label="언어"
          value={formData.language}
          onChange={updateField('language')}
          options={[
            { value: 'Korean', label: '한국어' },
            { value: 'English', label: '영어' },
            { value: 'Japanese', label: '일본어' },
            { value: 'Chinese', label: '중국어' },
          ]}
        />

        <FormField
          type="number"
          label="가격 (원)"
          value={formData.price.toString()}
          onChange={(v) => updateField('price')(parseFloat(v) || 0)}
          placeholder="49900"
          min={0}
          step={100}
        />
      </div>
    </GenericModal>
  );
}

// 스토리북 스토리도 동시 생성
export default CreateWorkModal;