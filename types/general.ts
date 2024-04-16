export type AccountTypeT = 'employer' | 'developer'

export type ProfileT = {
    id: string;
    created_at: string;
    name: string;
    title: string | null;
    email: string | null;
    country: string | null;
    bio: string | null;
    skills: string[] | null;
    available: boolean;
    freelance: boolean;
    employment: boolean;
    remote: boolean;
    on_site: boolean;
    role_levels: string[] | null;
    linkedin_url: string;
    github_url: string;
    gitlab_url: string;
    website_url: string;
    twitter_url: string;
    hourly_rate: number | null;
    account_type: 'developer' | 'employer';
    languages: string[] | null
}