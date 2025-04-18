# 🎯 PCF InputMask

Componente PCF (PowerApps Component Framework) para Power Platform / Dynamics 365 que permite aplicar máscaras de input configuráveis diretamente no campo, com suporte aos seguintes caracteres especiais:

- `9` → número
- `A` → letra
- `X` → número ou letra
- `?` → torna o caractere **a direita** opcional

---

## 💡 Exemplo de Máscaras

| Máscara            | Aplicação                        | Exemplo de entrada            | Resultado formatado                 |
| ------------------ | -------------------------------- | ----------------------------- | ----------------------------------- |
| `(99) ?99999-9999` | Telefone fixo/celular            | `1198761234` ou `11987651234` | `(11) 9876-1234`, `(11) 98765-1234` |
| `AAA-9X99`         | Placa de veículo (nova e antiga) | `FRQ6G23` ou `KJR4720`        | `FRQ-6G23`, `KJR-4720`              |

---

## 🚀 Recursos

- Máscara totalmente configurável via parâmetros
- Placeholder também configurável
- Comportamento opcional inteligente (`?`)
- Validação da máscara malformada
- Código limpo, performático e debuggável

---

## 🛠️ Parâmetros do Componente

| Parâmetro     | Tipo              | Uso                                   |
| ------------- | ----------------- | ------------------------------------- |
| `value`       | `SingleLine.Text` | Ligado ao campo do formulário (bound) |
| `placeholder` | `SingleLine.Text` | Texto exibido como dica no input      |
| `mask`        | `SingleLine.Text` | Máscara que será aplicada ao input    |

---

## 📦 Como usar

### 1. Crie a Solução no Power Apps

Adicione este controle a uma solução personalizada.

### 2. Publique com o Power Platform CLI

```bash
pac pcf push --publisher-prefix seuPrefixo
```
