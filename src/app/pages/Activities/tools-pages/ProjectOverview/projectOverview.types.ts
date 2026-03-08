// ─── pages/workflow/ProjectOverview/projectOverview.types.ts ──────────────

export type BlockFontSize   = "sm" | "base" | "lg" | "xl" | "2xl";
export type BlockFontWeight = "normal" | "medium" | "semibold" | "bold";
export type BlockTextAlign  = "left" | "center" | "right";
export type BlockTextColor  = "default" | "muted" | "gem" | "green" | "amber" | "red";

export interface BlockTextStyle {
    fontSize:   BlockFontSize;
    fontWeight: BlockFontWeight;
    textAlign:  BlockTextAlign;
    color:      BlockTextColor;
    italic:     boolean;
    underline:  boolean;
}

export interface DescriptionBlock {
    id:      string;
    content: string;
    style:   BlockTextStyle;
}

/** Stored in Firestore alongside the parent TaskClass */
export interface ProjectOverviewData {
    projectId:   string;
    description: DescriptionBlock[];
    updatedAt:   string;
}

/** Props passed into the page */
export interface ProjectOverviewProps {
    /** The full project from selectedTaskClass */
    project: TaskClass;
    onClose: () => void;
}