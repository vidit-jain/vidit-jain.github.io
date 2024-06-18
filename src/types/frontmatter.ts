interface Frontmatter {
  date: string;
  title: string;
  slug?: string;
  category: string;
  template: string;
  description?: string;
  tags?: Array<string>;
}

export default Frontmatter;
