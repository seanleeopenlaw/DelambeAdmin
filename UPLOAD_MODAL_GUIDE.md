# 📄 Upload Modal 사용 가이드

## 🚀 새로운 기능

Upload Modal이 더 직관적으로 개선되었습니다:

### ✨ 통합된 Chapter Title 선택기
- **Create New Chapter**: 완전히 새로운 챕터 생성  
- **Add to Existing Chapter**: 기존 챕터에 새 버전 추가
- 하나의 드롭다운에서 모든 옵션을 선택할 수 있습니다

## 📖 사용법

### 기본 사용법
```typescript
import { UploadVersionModal } from '@/components/modals/upload-version-modal';

function MyComponent() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  // 기존 챕터 데이터 (있을 경우)
  const availableChapters = [
    {
      id: 'chapter-1',
      title: 'Cultural Considerations in Sentencing',
      currentVersion: 'v2.3'
    },
    {
      id: 'chapter-2', 
      title: 'Evidence and Aboriginal Law',
      currentVersion: 'v1.4'
    }
  ];

  const handleUpload = (data) => {
    console.log('Upload data:', data);
    // data 구조:
    // {
    //   file: File,
    //   uploadComment: string,
    //   uploadedBy: string,
    //   uploadType: 'new-chapter' | 'add-to-existing',
    //   targetChapterId?: string,    // add-to-existing일 때만
    //   newChapterTitle?: string     // new-chapter일 때만
    // }
  };

  return (
    <UploadVersionModal
      open={uploadModalOpen}
      onOpenChange={setUploadModalOpen}
      availableChapters={availableChapters}
      onUpload={handleUpload}
    />
  );
}
```

### 새 챕터 생성 시 데이터 구조
```typescript
{
  file: File,
  uploadComment: "Added new legal framework chapter",
  uploadedBy: "Dr. Sarah Mitchell",
  uploadType: "new-chapter",
  newChapterTitle: "Legal Framework and Precedents"
}
```

### 기존 챕터 업데이트 시 데이터 구조
```typescript
{
  file: File,
  uploadComment: "Updated with latest High Court decisions",
  uploadedBy: "Justice Robert Chen", 
  uploadType: "add-to-existing",
  targetChapterId: "chapter-1"
}
```

## 🎯 UI/UX 개선사항

### 1. **통합된 Chapter Title 선택기**
- 하나의 드롭다운으로 모든 옵션 제공
- 새 챕터 생성과 기존 챕터 선택이 직관적으로 구분됨

### 2. **동적 폼 필드**
- 선택에 따라 필요한 필드만 표시
- 실시간 validation 및 disabled states

### 3. **명확한 시각적 구분**
- Plus 아이콘: 새 챕터 생성
- RefreshCw 아이콘: 기존 챕터에 버전 추가
- 구분선으로 옵션 그룹 분리

### 4. **스마트 Validation**
- 필수 필드가 모두 채워져야 버튼 활성화
- 챕터 선택 방식에 따른 조건부 validation

### 5. **향상된 사용자 경험**
- 버튼에 호버 이펙트 추가
- 의미있는 버튼 텍스트 ("Create Chapter" / "Add Version")

## 🔄 작업 흐름 예시

### 새 챕터 생성 흐름
1. **Chapter Title 선택**: "Create New Chapter" 선택
2. **New Chapter Title 입력**: 새 챕터의 제목 입력
3. **파일 선택**: DOCX 또는 PDF 업로드
4. **변경사항 설명**: 무엇이 포함되었는지 설명
5. **작성자 입력**: 파일 작성자 이름
6. **"Create Chapter" 버튼 클릭**

### 기존 챕터 업데이트 흐름  
1. **Chapter Title 선택**: 기존 챕터 중 하나 선택
2. **파일 선택**: 새 버전 파일 업로드  
3. **변경사항 설명**: 이번 버전에서 무엇이 변경되었는지
4. **작성자 입력**: 파일 작성자 이름
5. **"Add Version" 버튼 클릭**

## 💡 장점

### 사용성
- **직관적 인터페이스**: 명확한 선택지와 설명
- **조건부 필드**: 필요한 정보만 요청
- **즉시 피드백**: 실시간 validation과 상태 표시

### 기능성
- **유연한 업로드**: 새 섹션과 버전 업데이트 모두 지원
- **데이터 구조화**: 백엔드 처리에 최적화된 데이터 형태
- **확장성**: 추가 upload type 쉽게 추가 가능

### 개발자 경험  
- **타입 안전성**: TypeScript로 완전한 타입 체크
- **재사용성**: 다양한 컨텍스트에서 사용 가능
- **유지보수성**: 명확한 인터페이스와 분리된 로직

---

이제 사용자는 파일 업로드 시 명확하게 새 섹션을 만들지, 기존 섹션을 업데이트할지 선택할 수 있습니다! 🎉