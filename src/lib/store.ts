import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LevelType, TreeNode } from '@/types';

interface PublishingStore {
  // Navigation state
  selectedLevel: LevelType;
  selectedNodeId: string | null;
  treeData: TreeNode[];
  
  // Edit state
  editMode: boolean;
  editingField: string | null;
  
  // UI state
  sidebarCollapsed: boolean;
  
  // Actions
  setSelectedLevel: (level: LevelType) => void;
  setSelectedNodeId: (id: string | null) => void;
  setTreeData: (data: TreeNode[]) => void;
  toggleEditMode: () => void;
  setEditingField: (field: string | null) => void;
  toggleSidebar: () => void;
  
  // Tree operations
  toggleNodeExpansion: (nodeId: string) => void;
  addNode: (parentId: string, node: TreeNode) => void;
  updateNode: (nodeId: string, updates: Partial<TreeNode>) => void;
  deleteNode: (nodeId: string) => void;
}

export const usePublishingStore = create<PublishingStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedLevel: 'publisher',
        selectedNodeId: null,
        treeData: [],
        editMode: false,
        editingField: null,
        sidebarCollapsed: false,
        
        // Actions
        setSelectedLevel: (level) => set({ selectedLevel: level }),
        setSelectedNodeId: (id) => set({ selectedNodeId: id }),
        setTreeData: (data) => set({ treeData: data }),
        toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
        setEditingField: (field) => set({ editingField: field }),
        toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        
        // Tree operations
        toggleNodeExpansion: (nodeId) => {
          const updateNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map(node => {
              if (node.id === nodeId) {
                return { ...node, isExpanded: !node.isExpanded };
              }
              if (node.children) {
                return { ...node, children: updateNodeRecursive(node.children) };
              }
              return node;
            });
          };
          
          set((state) => ({
            treeData: updateNodeRecursive(state.treeData)
          }));
        },
        
        addNode: (parentId, node) => {
          const addNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map(n => {
              if (n.id === parentId) {
                return {
                  ...n,
                  children: [...(n.children || []), node],
                  isExpanded: true
                };
              }
              if (n.children) {
                return { ...n, children: addNodeRecursive(n.children) };
              }
              return n;
            });
          };
          
          set((state) => ({
            treeData: addNodeRecursive(state.treeData)
          }));
        },
        
        updateNode: (nodeId, updates) => {
          const updateNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map(node => {
              if (node.id === nodeId) {
                return { ...node, ...updates };
              }
              if (node.children) {
                return { ...node, children: updateNodeRecursive(node.children) };
              }
              return node;
            });
          };
          
          set((state) => ({
            treeData: updateNodeRecursive(state.treeData)
          }));
        },
        
        deleteNode: (nodeId) => {
          const deleteNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
            return nodes
              .filter(node => node.id !== nodeId)
              .map(node => ({
                ...node,
                children: node.children ? deleteNodeRecursive(node.children) : undefined
              }));
          };
          
          set((state) => ({
            treeData: deleteNodeRecursive(state.treeData)
          }));
        },
      }),
      { 
        name: 'publishing-storage',
        partialize: (state) => ({
          selectedLevel: state.selectedLevel,
          selectedNodeId: state.selectedNodeId,
          treeData: state.treeData,
          sidebarCollapsed: state.sidebarCollapsed,
        })
      }
    ),
    { name: 'publishing-store' }
  )
);