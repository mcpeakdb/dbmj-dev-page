export interface FakeProgram {
  id: number;
  name: string;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  data: string;
  type: string;
  active: boolean;
}

export interface FakeProgramData {
  [x: number]: FakeProgram;
}
