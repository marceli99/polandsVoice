## Uruchamianie aplikacji

1. W folderze z projektem uruchamiamy `npm install`
2. W celu stworzenia bazy (SQLite3) wpisujemy komendę: `node server/db/create.js`
3. (Opcjonalne) W celu stworzenia przykładowych danych w bazie wpisujemy komendę `node server/db/seed.js` 
4. Uruchamiamy aplikację (zarówno backend i frontend) wpisując `npm start`. W razie potrzeby uprzednio serwer można uruchomić osobno za pomocą `npm run start-server`.

## Specyfikacja
### Opis aplikacji

Aplikacja daje możliwość przeglądania najnowszych sondaży politycznych.

### Funkjonalności

- Możliwość dodawania, usuwania i edycji sondaży
- Nowoczesny i skalowalny UI
- Obliczanie średniego poparcia z ostatnich trzech miesięcy
- Wyświetlanie listy sondaży wraz z informacją o ich dacie, poparciu partii, pracowni oraz metodologii badania.
- Obliczanie prognozowanej liczby mandatów w oparciu o wzór profesora Flisa.
- Wyświetlanie prognozowanej liczby mandatów na wykresie.
- Określanie większości parlamentarnej, głosów potrzebnych do odrzucenia veta prezydenta i większości konstytucyjnej.

### Grupy docelowe
Grupa docelowa to osoby miłujące statystyką oraz osoby mniej lub bardziej zainteresowane sytuacją polityczną w kraju.

### Korzyści z korzystania z aplikacji
1. Prosta możliwość określenia trendów i poglądów wyborców. 
2. Możliwość określenia nastrojów społecznych.
