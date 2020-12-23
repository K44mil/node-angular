export class News {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    isVisible: boolean;
    isCommentable: boolean;
    isLoginProtected: boolean;
    imageSection: boolean;
    filesSection: boolean;
    created_at: Date;
    updated_at: Date;
}