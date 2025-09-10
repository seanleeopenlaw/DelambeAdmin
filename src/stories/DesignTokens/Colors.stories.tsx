import type { Meta, StoryObj } from '@storybook/react';
import { semanticColors, statusColors, actionColors, statsColors } from '@/lib/design-tokens/colors';

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Unified color system for consistent branding across the application. All colors follow semantic naming for better maintainability.'
      }
    }
  },
};

export default meta;

// Color Swatch Component
interface ColorSwatchProps {
  name: string;
  className: string;
  description?: string;
}

const ColorSwatch = ({ name, className, description }: ColorSwatchProps) => {
  const isText = className.startsWith('text-');
  const isBg = className.startsWith('bg-');
  
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <div 
        className={`w-8 h-8 rounded-full border border-border ${
          isText ? 'bg-current' : isBg ? className : 'bg-current'
        }`}
        style={isText ? { color: 'var(--' + className.replace('text-', '') + ')' } : {}}
      />
      <div className="flex-1">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-muted-foreground font-mono">{className}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};

// Hierarchy Colors Story
export const HierarchyColors: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Hierarchy Level Colors</h2>
        <p className="text-muted-foreground mb-6">
          Colors used to represent different levels in the document hierarchy. Each level has a consistent semantic meaning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorSwatch 
            name="Publisher" 
            className={semanticColors.publisher.primary}
            description="Top-level organization"
          />
          <ColorSwatch 
            name="Work" 
            className={semanticColors.work.primary}
            description="Individual publications"
          />
          <ColorSwatch 
            name="Edition" 
            className={semanticColors.edition.primary}
            description="Publication versions"
          />
          <ColorSwatch 
            name="Draft" 
            className={semanticColors.draft.primary}
            description="Working drafts"
          />
          <ColorSwatch 
            name="Chapter" 
            className={semanticColors.chapter.primary}
            description="Document sections"
          />
          <ColorSwatch 
            name="File" 
            className={semanticColors.file.primary}
            description="Individual documents"
          />
        </div>
      </div>
    </div>
  )
};

// Status Colors Story  
export const StatusColors: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Status Colors</h2>
        <p className="text-muted-foreground mb-6">
          Colors used to indicate the current state or status of documents and tasks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorSwatch 
            name="Published" 
            className={statusColors.published.text}
            description="Live, published content"
          />
          <ColorSwatch 
            name="Draft" 
            className={statusColors.draft.text}
            description="Work in progress"
          />
          <ColorSwatch 
            name="Under Review" 
            className={statusColors['under-review'].text}
            description="Pending approval"
          />
          <ColorSwatch 
            name="Completed" 
            className={statusColors.completed.text}
            description="Finished tasks"
          />
          <ColorSwatch 
            name="In Progress" 
            className={statusColors['in-progress'].text}
            description="Active work"
          />
          <ColorSwatch 
            name="Not Started" 
            className={statusColors['not-started'].text}
            description="Pending tasks"
          />
        </div>
      </div>
    </div>
  )
};

// Action Colors Story
export const ActionColors: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Action Colors</h2>
        <p className="text-muted-foreground mb-6">
          Colors used for interactive elements like buttons, links, and call-to-action items.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorSwatch 
            name="Primary" 
            className={actionColors.primary.text}
            description="Main actions and CTAs"
          />
          <ColorSwatch 
            name="Secondary" 
            className={actionColors.secondary.text}
            description="Secondary actions"
          />
          <ColorSwatch 
            name="Success" 
            className={actionColors.success.text}
            description="Positive actions"
          />
          <ColorSwatch 
            name="Warning" 
            className={actionColors.warning.text}
            description="Cautionary actions"
          />
          <ColorSwatch 
            name="Danger" 
            className={actionColors.danger.text}
            description="Destructive actions"
          />
        </div>
      </div>
    </div>
  )
};

// Statistics Colors Story
export const StatisticsColors: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Statistics Colors</h2>
        <p className="text-muted-foreground mb-6">
          Colors used in data visualization, statistics, and metrics displays.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorSwatch 
            name="Primary Stats" 
            className={statsColors.primary.text}
            description="Main metrics"
          />
          <ColorSwatch 
            name="Secondary Stats" 
            className={statsColors.secondary.text}
            description="Supporting metrics"
          />
          <ColorSwatch 
            name="Tertiary Stats" 
            className={statsColors.tertiary.text}
            description="Additional metrics"
          />
          <ColorSwatch 
            name="Quaternary Stats" 
            className={statsColors.quaternary.text}
            description="Extra metrics"
          />
        </div>
      </div>
    </div>
  )
};

// Usage Examples Story
export const UsageExamples: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        <p className="text-muted-foreground mb-6">
          Examples of how to use the color system in components.
        </p>
        
        {/* Icon Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Icon Colors</h3>
          <div className="flex items-center gap-6 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded ${semanticColors.work.primary}`}>📚</div>
              <span>Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded ${semanticColors.edition.primary}`}>📖</div>
              <span>Edition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded ${semanticColors.chapter.primary}`}>📄</div>
              <span>Chapter</span>
            </div>
          </div>
        </div>

        {/* Badge Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Status Badges</h3>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <span className={`px-2 py-1 rounded text-xs ${statusColors.published.text} ${statusColors.published.background} ${statusColors.published.border} border`}>
              Published
            </span>
            <span className={`px-2 py-1 rounded text-xs ${statusColors.draft.text} ${statusColors.draft.background} ${statusColors.draft.border} border`}>
              Draft
            </span>
            <span className={`px-2 py-1 rounded text-xs ${statusColors['under-review'].text} ${statusColors['under-review'].background} ${statusColors['under-review'].border} border`}>
              Under Review
            </span>
          </div>
        </div>

        {/* Button Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Action Buttons</h3>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <button className={`px-4 py-2 rounded text-white ${actionColors.primary.background} ${actionColors.primary.hover}`}>
              Primary
            </button>
            <button className={`px-4 py-2 rounded ${actionColors.secondary.text} ${actionColors.secondary.background} ${actionColors.secondary.hover}`}>
              Secondary
            </button>
            <button className={`px-4 py-2 rounded text-white ${actionColors.danger.background} ${actionColors.danger.hover}`}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};