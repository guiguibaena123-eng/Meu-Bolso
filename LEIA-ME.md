# Meu Bolso: versão instalável (abre sem internet)

Esta pasta é o app completo. Depois de colocada num endereço na internet e instalada no iPhone, ele abre e funciona **sem nenhuma conexão**.

## 1. Colocar no ar (uma vez só, gratuito)

Escolha **uma** das opções.

**Netlify Drop (a mais simples, sem cadastro de código)**
1. Abra https://app.netlify.com/drop no computador.
2. Arraste **a pasta inteira** `MeuBolso-instalavel` para a página.
3. Anote o endereço que aparece (algo como `https://nome-aleatorio.netlify.app`).
   Crie uma conta gratuita quando o site pedir, para o endereço não ser apagado depois de algumas horas.

**GitHub Pages**
1. Crie um repositório e envie todos os arquivos desta pasta.
2. Em Settings > Pages, escolha a branch principal e a pasta raiz.
3. O endereço será `https://seu-usuario.github.io/nome-do-repositorio/`.

O endereço fica aberto para quem tiver o link, mas **nenhum dado seu vai para lá**. Os lançamentos ficam só no seu iPhone.

## 2. Instalar no iPhone

1. No **Safari**, abra o endereço (esta primeira vez precisa de internet).
2. Toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.
3. Abra o app **pelo ícone** da Tela de Início, ainda com internet, uma vez.
4. Pronto. A partir daí abre sem internet.

Registre seus dados **depois de instalar**, abrindo sempre pelo ícone. No iPhone, o ícone e o Safari guardam os dados em lugares separados.

## 3. Seus dados e o backup

- Tudo fica guardado no iPhone. Se você apagar o ícone ou limpar os dados do Safari, perde tudo.
- Em **Metas > Backup dos dados**, use **Salvar backup** de vez em quando e guarde o arquivo no app Arquivos ou no iCloud Drive.
- **Restaurar backup** traz tudo de volta e tem **Desfazer** logo depois.
- Esta versão não sincroniza com a versão do claude.ai. Os dados de cada uma são separados.

## 4. Atualizar o app

Se o `index.html` mudar, abra o arquivo `sw.js`, troque `meu-bolso-v1` por `meu-bolso-v3` (e assim por diante) e envie a pasta de novo. O iPhone atualiza na próxima vez que o app abrir com internet.

## Arquivos

- `index.html`: o app
- `sw.js`: guarda o app no aparelho para abrir offline
- `manifest.webmanifest`, `icon-v2-192.png`, `icon-v2-512.png`, `apple-touch-icon-v2.png`: instalação e ícone
