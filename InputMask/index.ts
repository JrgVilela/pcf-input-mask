import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class InputMask
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _notifyOutputChanged: () => void;
  private _container: HTMLDivElement;
  private _input: HTMLInputElement;
  private _value: string;
  private _mask: string;

  // constructor() {
  //     // Empty
  // }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;

    //Cria o input
    this._input = document.createElement("input");
    this._input.type = "text";
    this._input.className = "j-pcf-input";

    //Define a mascara e o placeholder
    this._mask = context.parameters.mask?.raw || "";
    const placeholder = context.parameters.placeholder?.raw || "";
    this._input.placeholder = placeholder;

    // Aplica valor inicial se houver
    this._value = context.parameters.value.raw ?? "";
    this._input.value = this.aplicarMascara(this._value, this._mask);

    // Evento de input para aplicar a máscara dinâmica
    this._input.addEventListener("input", (e) => {
      const rawValue = (e.target as HTMLInputElement).value;
      this._value = this.aplicarMascara(rawValue, this._mask);
      this._input.value = this._value;
      this._notifyOutputChanged();
    });

    this._container.appendChild(this._input);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const novoValor = context.parameters.value.raw ?? "";
    if (novoValor !== this._value) {
      this._value = this.aplicarMascara(novoValor, this._mask);
      this._input.value = this._value;
    }

    // Atualiza máscara e placeholder se alterados dinamicamente
    const novaMascara = context.parameters.mask?.raw ?? "";
    if (novaMascara !== this._mask) {
      this._mask = novaMascara;
    }

    this._input.placeholder = context.parameters.placeholder?.raw ?? this._mask;
  }

  public getOutputs(): IOutputs {
    return {
      value: this._value,
    };
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private aplicarMascara(valor: string, mascara: string): string {
    //Texto Sem mascara aplicada
    const resultado: string[] = [];
    const textoLimpo = valor.replace(/\W/g, "");
    const mascaraLimpa = mascara.replace(/\W/g, "");
    const mascaraArray = mascara.toUpperCase().split("");
    let textoIndex = 0;

    if (mascara.endsWith("?") || mascara.includes("??")) {
      console.error("A mascara nao pode terminar com ? ou ter ??");
    }

    // Verificando se temos opcionais na mascara
    while (mascaraArray.includes("?")) {
      if (mascaraArray.includes("?")) {
        // Se o texto limpo for menor que a mascara limpo, significa que não precisamos aplicar o opcional da mascara, então removemos ele o seu caracter a direita
        // Se não eu removo somente o '?' e o caracter a direita fará parte da marcara
        mascaraArray.splice(
          mascaraArray.indexOf("?"),
          textoLimpo.length < mascaraLimpa.length ? 2 : 1
        );
      }
    }

    for (const m of mascaraArray) {
      const c = textoLimpo[textoIndex];
      if (!c) break;

      const isNumero = /\d/.test(c);
      const isLetra = /[a-zA-Z]/.test(c);

      if (m === "9") {
        if (!isNumero) break;
        resultado.push(c);
        textoIndex++;
      } else if (m === "A") {
        if (!isLetra) break;
        resultado.push(c);
        textoIndex++;
      } else if (m === "X") {
        if (!isLetra && !isNumero) break;
        resultado.push(c);
        textoIndex++;
      } else {
        resultado.push(m);
      }
    }

    return resultado.join("");
  }

  /**
   * Aplica a máscara customizada no valor usando os seguintes símbolos:
   * 9 = número, A = letra, X = número ou letra, ? = opcional
   */
  //   private aplicarMascara(valor: string, mascara: string): string {
  //     // eslint-disable-next-line no-debugger
  //     debugger;
  //     const resultado: string[] = [];
  //     const textoLimpo = valor.replace(/\W/g, "");
  //     let textoIndex = 0;
  //     const mascaraArray = mascara.toUpperCase().split("");

  //     for (let i = 0; i < mascaraArray.length; i++) {
  //       const m = mascaraArray[i];

  //       // Trata caractere opcional
  //       let opcional = false;
  //       if (mascaraArray[i + 1] === "?") {
  //         opcional = true;
  //       }

  //       const c = textoLimpo[textoIndex];
  //       if (!c) break;

  //       const eNumero = /\d/.test(c);
  //       const eLetra = /[a-zA-Z]/.test(c);

  //       // Lógica para cada tipo de caractere
  //       if (m === "9") {
  //         if (eNumero) {
  //           resultado.push(c);
  //           textoIndex++;
  //         } else if (!opcional) {
  //           break;
  //         }
  //       } else if (m === "A") {
  //         if (eLetra) {
  //           resultado.push(c.toUpperCase());
  //           textoIndex++;
  //         } else if (!opcional) {
  //           break;
  //         }
  //       } else if (m === "X") {
  //         if (eNumero || eLetra) {
  //           resultado.push(c.toUpperCase());
  //           textoIndex++;
  //         } else if (!opcional) {
  //           break;
  //         }
  //       } else if (m === "?") {
  //         // pula o "?" aqui porque ele foi tratado no anterior
  //         continue;
  //       } else {
  //         // caractere fixo da máscara
  //         resultado.push(m);
  //         if (c === m) {
  //           textoIndex++;
  //         }
  //       }

  //       if (opcional) {
  //         i++; // pula o "?" na máscara
  //       }
  //     }

  //     return resultado.join("");
  //   }
}
