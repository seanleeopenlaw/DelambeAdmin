#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateComponent(componentName, type = 'organism') {
  const componentDir = `src/components/design-system/${type}s/${componentName}`;
  
  // 디렉토리 생성
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // 컴포넌트 파일
  const componentContent = `import { ReactNode } from 'react';

interface ${componentName}Props {
  children?: ReactNode;
  className?: string;
}

export function ${componentName}({ 
  children, 
  className 
}: ${componentName}Props) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default ${componentName};`;

  // 스토리 파일
  const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Design System/${type.charAt(0).toUpperCase() + type.slice(1)}s/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${componentName} Content',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: '${componentName} with custom styling',
    className: 'bg-blue-100 p-4 rounded',
  },
};`;

  // 파일 쓰기
  fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
  fs.writeFileSync(path.join(componentDir, `${componentName}.stories.tsx`), storyContent);
  
  console.log(`✅ ${componentName} 컴포넌트가 생성되었습니다!`);
  console.log(`📁 위치: ${componentDir}`);
  console.log(`📖 스토리북에서 확인: Design System/${type.charAt(0).toUpperCase() + type.slice(1)}s/${componentName}`);
}

// CLI 실행
const [,, componentName, type] = process.argv;

if (!componentName) {
  console.log('사용법: node scripts/component-generator.js <ComponentName> [type]');
  console.log('예: node scripts/component-generator.js DataTable organism');
  process.exit(1);
}

generateComponent(componentName, type || 'organism');