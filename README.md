# Reelease AI — Smart AI Content Generation Suite

Uma SPA (Single Page Application) de landing page para o produto **Reelease AI**, construída em JavaScript puro com arquitetura modular e sem nenhuma dependência externa ou ferramenta de build.

---

## Visão Geral

| Item | Detalhe |
|------|---------|
| **Tipo** | Landing page SPA |
| **Linguagem** | JavaScript (ES Modules), CSS, HTML |
| **Build tool** | Nenhum — roda direto no browser |
| **Dependências** | Zero — ícones como SVG inline, sem npm |
| **Padrão** | Componentes com ciclo de vida (mount / render / destroy) |

---

## Estrutura do Projeto

```
SPA_Model/
├── index.html                  # Ponto de entrada — importa os CSS e o main.js
├── src/
│   ├── main.js                 # Bootstrap: cria slots, instancia e monta componentes
│   │
│   ├── core/                   # Camada de framework
│   │   ├── Component.js        # Classe base de todos os componentes
│   │   ├── EventBus.js         # Sistema PubSub para comunicação desacoplada
│   │   └── Router.js           # Roteamento hash-based com scroll suave
│   │
│   ├── components/             # Seções da página
│   │   ├── Navbar.js           # Barra de navegação fixa com scroll shrink
│   │   ├── Hero.js             # Seção hero com ícones flutuantes e parallax
│   │   ├── Features.js         # Showcase de funcionalidades com sticky scroll
│   │   ├── Social.js           # Mockup de celular interativo (Instagram/Facebook)
│   │   ├── Pricing.js          # Planos de preço com toggle mensal/anual
│   │   ├── Blog.js             # Grid de posts do blog
│   │   ├── Testimonials.js     # Carrossel marquee de depoimentos
│   │   ├── FAQ.js              # Acordeão de perguntas frequentes
│   │   ├── Contact.js          # Formulário de contato com validação
│   │   ├── Footer.js           # Rodapé com links e redes sociais
│   │   └── BackToTop.js        # Botão flutuante de voltar ao topo
│   │
│   ├── animations/             # Módulos de animação globais
│   │   ├── ScrollReveal.js     # Elementos aparecem ao entrar na viewport
│   │   ├── ParallaxGlow.js     # Glow de fundo segue o mouse (parallax)
│   │   ├── FloatingIcons.js    # Ícones flutuantes no hero convergem ao rolar
│   │   ├── StickyFeatures.js   # Cards de feature com comportamento sticky
│   │   └── TestimonialsMarquee.js # Carrossel automático de depoimentos
│   │
│   ├── styles/                 # CSS por responsabilidade
│   │   ├── variables.css       # Tokens de design (cores, raios, sombras)
│   │   ├── base.css            # Reset e estilos globais
│   │   ├── animations.css      # Keyframes e classes de animação reutilizáveis
│   │   ├── utilities.css       # Classes utilitárias (.container, .section-badge…)
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── features.css
│   │   ├── social.css
│   │   ├── pricing.css
│   │   ├── blog.css
│   │   ├── testimonials.css
│   │   ├── faq.css
│   │   ├── contact.css
│   │   └── footer.css
│   │
│   └── utils/
│       └── icons.js            # Fábrica de ícones SVG inline (baseados em Lucide)
```

---

## Arquitetura

### Classe base `Component`

Todos os componentes herdam de `Component` e seguem o mesmo contrato:

```js
class MeuComponente extends Component {
  render()       // Retorna HTML como string
  afterMount()   // Chamado após o HTML ser inserido no DOM
  destroy()      // Remove listeners e limpa o DOM
  _addCleanup(fn) // Registra funções de limpeza (timers, listeners)
  $(sel)         // querySelector dentro do container
  $$(sel)        // querySelectorAll dentro do container
}
```

### Ciclo de vida

```
new Componente(containerEl)
  └─ mount()
       ├─ render()       → gera o HTML
       ├─ innerHTML =    → insere no DOM
       └─ afterMount()   → conecta eventos, inicia animações

destroy()
  ├─ executa todos os _cleanups registrados
  └─ limpa innerHTML
```

### Comunicação entre componentes

Usa o `EventBus` (pub/sub) para que componentes se comuniquem sem acoplamento direto:

```js
EventBus.emit('evento', payload);
EventBus.on('evento', handler);
```

---

## Seções da Página

| Seção | Descrição |
|-------|-----------|
| **Navbar** | Fixa no topo, encolhe ao rolar, links com scroll suave |
| **Hero** | Título, subtítulo, CTAs e ícones flutuantes com parallax de mouse + convergência ao rolar |
| **Features** | Cards de funcionalidades com sticky scroll e reveal animado |
| **Social** | Mockup de celular interativo com 4 telas: Feed, Reels, Criar e Perfil |
| **Pricing** | 3 planos com toggle mensal/anual e destaque no plano recomendado |
| **Blog** | Grid de artigos com gradientes e categorias |
| **Testimonials** | Marquee automático de depoimentos de clientes |
| **FAQ** | Acordeão animado com perguntas e respostas |
| **Contact** | Formulário com validação client-side e feedback visual |
| **Footer** | Links de navegação, redes sociais e informações de contato |

---

## Destaque: Mockup de Celular Interativo (`Social.js`)

O telefone na seção Social é um componente totalmente interativo:

- **Frame realista** — Dynamic Island, barra de status com relógio ao vivo, botões laterais em CSS
- **4 painéis** com transições deslizantes direcionais:
  - **Feed** — Stories, posts com imagens gradiente, botões de curtir/comentar/salvar
  - **Reels** — Tela cheia vertical, clique para avançar, barra de progresso animada
  - **Criar** — Seletor de estilo, botão Generate com spinner → imagem resultado
  - **Perfil** — Avatar, estatísticas, bio, grade de posts
- **Curtir** tem micro-animação (coração fica vermelho com efeito pop)
- **Abas Instagram / Facebook** trocam a cor de destaque via CSS custom property `--pa`

---

## Ícones

Os ícones são gerados via `src/utils/icons.js` como SVG inline — sem CDN, sem npm:

```js
import { icon, largeIcon } from '../utils/icons.js';

icon('sparkles', 20, '#fff')         // SVG de tamanho fixo
largeIcon('camera', '#E1306C')       // SVG responsivo (herda font-size do pai)
```

Baseados nos paths da biblioteca [Lucide](https://lucide.dev/).

---

## Como Rodar

Não há build. Basta servir a pasta raiz com qualquer servidor HTTP estático:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Acesse `http://localhost:8080` no browser.

> **Nota:** O projeto usa ES Modules (`type="module"`), portanto **não funciona abrindo o `index.html` diretamente como `file://`** — é necessário um servidor HTTP.

---

## Tokens de Design (`variables.css`)

As cores e espaçamentos são centralizados em CSS custom properties:

```css
--primary:    #3b82f6   /* Azul principal */
--secondary:  #8b5cf6   /* Roxo secundário */
--bg:         #030712   /* Fundo escuro */
--surface:    #0f172a   /* Superfície de cards */
--border:     rgba(255,255,255,0.08)
--text-muted: rgba(255,255,255,0.55)
--radius-lg:  16px
```

---

## Princípios Aplicados

- **Single Responsibility** — cada componente e módulo tem uma única responsabilidade
- **Open/Closed** — novos componentes estendem `Component` sem modificar o core
- **Liskov Substitution** — qualquer componente pode substituir outro na árvore de montagem
- **Dependency Inversion** — `main.js` orquestra sem depender de implementações concretas
- **Zero dependências** — portabilidade máxima, sem lock-in de ecossistema
