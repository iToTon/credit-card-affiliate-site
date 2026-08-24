# デプロイ手順(Cloudflare Pages)

このサイトは静的サイト(Astro)なので、GitHub + Cloudflare Pages の組み合わせで無料でホスティングできます。
push するたびに自動でビルド・デプロイされます。

ローカルの git リポジトリは作成済み、最初のコミットも完了しています。

## 1. GitHubにリポジトリを作成する(ご自身の操作が必要)

1. https://github.com/new を開く(ログインが必要です)
2. リポジトリ名を入力(例: `credit-card-affiliate-site`)。Public / Private どちらでも可(Cloudflare Pagesとの連携には影響しません)
3. 「Initialize this repository with」系のチェックはすべて **オフ** のまま作成(README等をこちらで既に作成済みのため)
4. 作成後に表示されるリポジトリURL(`https://github.com/xxxx/xxxx.git`)をコピーして、私に共有してください
   → 共有いただければ、`git remote add` と `git push` はこちらで実行します

## 2. Cloudflare Pagesでサイトを公開する(ご自身の操作が必要)

1. https://dash.cloudflare.com/ にログイン(アカウントが無ければ作成)
2. 左メニューの **Workers & Pages** → **Create** → **Pages** タブ → **Connect to Git**
3. GitHubと連携し、手順1で作成したリポジトリを選択
4. ビルド設定を入力:
   - **Framework preset**: `Astro`(自動検出されるはずです)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 「Save and Deploy」をクリック → 数分でビルドが走り、`https://xxxx.pages.dev` という仮URLで公開されます

この時点でサイトはインターネット上に公開されます(誰でもアクセス可能)。中身をまだ見せたくない場合は、Cloudflare Pagesの `Settings > Access Policy`(Cloudflare Zero Trust)でアクセス制限をかけることも可能です。

## 3. 独自ドメインの取得・接続(任意・ご自身の操作が必要、支払いが発生します)

1. ドメインを取得(未取得の場合)。Cloudflare Pagesとの相性が良いのは **Cloudflare Registrar**(https://dash.cloudflare.com/ → Domain Registration)ですが、お名前.com等どこで取得したドメインでも接続可能です
2. Cloudflare Pagesのプロジェクト → **Custom domains** タブ → **Set up a custom domain** → 取得したドメインを入力
3. ドメインをCloudflareで取得した場合は自動でDNSが設定されます。他社で取得した場合は、指示されるCNAMEレコードを取得元の管理画面で設定してください

## 4. 独自ドメイン接続後にやること

`src/site.config.ts` の `url` を実際のドメインに更新してください(`astro.config.mjs` の `site` にも自動反映されます)。

```ts
url: "https://あなたのドメイン",
```

更新後、`git push` すれば自動で再デプロイされ、サイトマップ・OGP・canonical URLがすべて正しいドメインを指すようになります。

---

## 参考: CLIから直接デプロイする場合(GitHub連携なしの代替手段)

GitHubを使わず、手元から直接デプロイすることも可能です(ただしpushするたびの自動デプロイにはなりません)。

```bash
npm run build
npx wrangler login    # ブラウザでCloudflareアカウントの認証が開きます(ご自身で操作してください)
npx wrangler pages deploy dist --project-name=credit-card-affiliate-site
```

`wrangler login` は初回のみ必要です。ブラウザでの認証操作はご自身で行ってください。
