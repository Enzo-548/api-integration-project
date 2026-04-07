# 🌍 Sprint: API de Geolocalização + Clima

## Exemplo de resposta da API weather:

```json
{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}
```

---

## 📌 Descrição

Esta sprint tem como objetivo desenvolver uma aplicação web que consome APIs externas para:

- Obter a localização geográfica do usuário (geolocalização)
- Buscar informações de clima/tempo com base na localização obtida

A aplicação será construída utilizando **HTML, CSS e JavaScript puro (Vanilla JS)**, com foco em integração de APIs e manipulação de dados em tempo real.

---

## 🎯 Objetivos da Sprint

- Implementar captura de localização do usuário (latitude e longitude)
- Consumir uma API de clima/tempo
- Exibir informações relevantes de forma clara e responsiva
- Praticar conceitos de requisições HTTP (`fetch`)
- Trabalhar com manipulação de DOM

---

## 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- APIs externas do OpenWeatherMap (Geolocalização e Clima)

---

## 🔗 Funcionalidades

- 📍 Obter localização atual do usuário via navegador
- 🌤️ Exibir clima atual (temperatura, condição, cidade)
- 🕒 Atualização dinâmica dos dados
- ⚠️ Tratamento de erros (ex: usuário nega permissão)

---

## 📁 Estrutura de Pastas

```
/project-root
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 💡 Exemplo de Fluxo

1. Usuário acessa a página
2. Navegador solicita permissão de localização
3. Coordenadas são capturadas
4. Aplicação faz requisição para API de clima
5. Dados são exibidos na tela

---

## ⚠️ Possíveis Desafios

- Permissões de localização negadas
- Latência na resposta da API
- Tratamento de dados inconsistentes
- Responsividade da interface

---

## 📈 Melhorias Futuras

- Previsão para vários dias
- Busca por cidade manual
- Tema dinâmico baseado no clima
- Uso de frameworks (React, Vue)

---

## 👨‍💻 Autor

Desenvolvido durante sprint de aprendizado focada em consumo de APIs e desenvolvimento frontend.

---
