// データ型をまとめて定義するファイル。
/* authSlice.ts */
export interface LOGIN_USER {
  id:number;
  username:string;
}
// アバターの画像を取り扱うため、ユーザが画像ファイルを洗濯してアップロードするためのもの。
// JSではファイルオブジェクトに対するデータ型が予め決まっている。
// 内容：最終更新日時。ファイル名。
export interface FILE extends Blob {
  readonly lastModified : number;
  readonly name: string;
}

// イメージのURLが文字列として取得できるがない場合もあるので、nullも許容。　
export interface PROFILE {
  id:number;
  user_profile:number;
  img : string | null;
}

export interface POST_PROFILE{
  id:number;
  img: File |null;
}

export interface CRED {
  usernamw:string;
  password: string;
}

export interface JWT {
  refresh:string;
  access: string;
}

export interface USER {
  id:number;
  username:string;
}

// ログインと登録をBooleanで管理する
export interface AUTH_STATE {
isLoginView: boolean;
loginUser:LOGIN_USER;
profiles:PROFILE[];
}
