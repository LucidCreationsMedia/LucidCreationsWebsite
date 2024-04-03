export interface LinkObj {
  href?: string;
  name?: string;
  type: "primary" | "secondary" | "ko-fi" | "GitHub";
}

type Links = LinkObj[];

const links: Links = [
  {
    href: "https://docs.google.com/document/d/1y1tbTG6TYoLMEde4XHzInByyHQ0T6Aw2RF6Y4Z7Yabs",
    name: "Roadmap and Progress",
    type: "secondary"
  },
  // {
  //   type: "ko-fi"
  // },
  {
    href: "https://t.me/LucidCreationsMedia",
    name: "Dev Updates",
    type: "secondary"
  },
  {
    type: "GitHub"
  }
];

export default links;
