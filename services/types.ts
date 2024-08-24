export type AddAdminPayload = {
  email: string;
  displayName: string;
};

export type UpdateAdminPayload = AddAdminPayload & { uid: string };

type StandardFields = {
  createdAt: number;
  updateAt?: number;
};

export type TitleAndContent = StandardFields & {
  title: string;
  content: string;
};

export type TitleAndList = StandardFields & {
  title: string;
  content: string;
  list: Record<string, TitleAndContent>;
};
