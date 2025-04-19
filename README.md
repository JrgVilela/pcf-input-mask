# 🎯 PCF InputMask

![Feito com 💙 para a comunidade Power Platform](https://img.shields.io/badge/feito%20com%20💙-Power%20Platform-blueviolet?style=flat-square)
![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178c6?logo=typescript&style=flat-square)
![PCF Ready](https://img.shields.io/badge/PCF-Compatible-success?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)

A PCF (PowerApps Component Framework) custom control for Power Platform / Dynamics 365 that allows configurable input masks directly on form fields. Supports the following special mask characters:

- `9` → digit
- `A` → letter
- `X` → digit or letter
- `?` → makes the **character to its right** character optional

---

## 💡 Mask Examples

| Mask               | Use Case                         | Input Example                 | Formatted Output                    |
| ------------------ | -------------------------------- | ----------------------------- | ----------------------------------- |
| `(99) ?99999-9999` | Landline/mobile phone numbers    | `1198761234` or `11987651234` | `(11) 9876-1234`, `(11) 98765-1234` |
| `AAA-9X99`         | Brazilian vehicle license plates | `FRQ6G23` or `KJR4720`        | `FRQ-6G23`, `KJR-4720`              |

---

## 🚀 Features

- Fully configurable input mask
- Configurable placeholder
- Intelligent optional character handling with `?`
- Mask validation to prevent malformed patterns
- Clean, efficient, and debuggable code

---

## 🛠️ Component Parameters

| Parameter     | Type              | Purpose                                 |
| ------------- | ----------------- | --------------------------------------- |
| `value`       | `SingleLine.Text` | Binds to the form field (`bound` usage) |
| `placeholder` | `SingleLine.Text` | Placeholder text shown inside the input |
| `mask`        | `SingleLine.Text` | The input mask pattern                  |

---

## 📦 How to Use

### 1. Add to a Power Apps Solution

Include this control inside a custom solution in Power Apps.

### 2. Publish using Power Platform CLI

```bash
pac pcf push --publisher-prefix yourPrefix
```
