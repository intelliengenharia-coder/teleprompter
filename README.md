# Teleprompter, versão de leitura

Página que rola o roteiro em um aparelho enquanto o outro grava. Não abre câmera
e não grava vídeo: a gravação continua sendo trabalho do app nativo do iPhone.

No ar em: https://intelliengenharia-coder.github.io/teleprompter/

## O que ela faz

- Ritmo em palavras por minuto de verdade, não em "1x, 2x"
- Mostra quanto tempo de fala ainda falta
- Tamanho da letra, entrelinha, largura da coluna e altura da linha de leitura
- Espelho horizontal e vertical, para quem usa vidro na frente da lente
- Toque no texto pausa e retoma
- Tela não apaga durante a leitura
- Roteiro guardado no próprio aparelho, sem nuvem e sem conta

## Como este arquivo é gerado

A fonte é `web/teleprompter.html` no projeto do app, e não este repositório.
Aqui mora só o resultado de `web/build.sh`, que acrescenta o que navegador de
celular exige e o arquivo de projeto não tinha: charset, viewport, manifest,
ícone e os ajustes de toque.

Para republicar depois de mexer no roteiro da página:

```
cd <projeto>/web
./build.sh <pasta deste repositório>
git -C <pasta deste repositório> commit -am "atualiza pagina" && git push
```
