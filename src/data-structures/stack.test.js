import Stack from './stack.js'; // Pfad zu deiner Stack-Datei anpassen

describe('Stack Klasse', () => {
  let stack;

  // Vor JEDEM einzelnen Test erstellen wir einen frischen, leeren Stack.
  // Das verhindert, dass sich Tests gegenseitig beeinflussen.
  beforeEach(() => {
    stack = new Stack();
  });

  test('sollte leer initialisiert werden', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  describe('push()', () => {
    test('sollte Elemente zum Stack hinzufügen', () => {
      stack.push('A');
      expect(stack.size()).toBe(1);
      expect(stack.isEmpty()).toBe(false);
      expect(stack.peek()).toBe('A');
    });

    test('sollte die Reihenfolge (LIFO) einhalten', () => {
      stack.push('A');
      stack.push('B');
      expect(stack.peek()).toBe('B'); // Das letzte Element muss oben liegen
    });
  });

  describe('pop()', () => {
    test('sollte das oberste Element entfernen und zurückgeben', () => {
      stack.push('A');
      stack.push('B');
      
      const popped = stack.pop();
      expect(popped).toBe('B'); // LIFO: 'B' kam als letztes, fliegt als erstes
      expect(stack.size()).toBe(1);
      expect(stack.peek()).toBe('A'); // 'A' ist jetzt wieder oben
    });

    test('sollte einen String zurückgeben, wenn der Stack leer ist', () => {
      const result = stack.pop();
      expect(result).toBe('Stack is empty');
    });
  });

  describe('peek()', () => {
    test('sollte das oberste Element zeigen, ohne es zu entfernen', () => {
      stack.push('A');
      stack.push('B');
      
      expect(stack.peek()).toBe('B');
      expect(stack.size()).toBe(2); // Größe bleibt unverändert!
    });

    test('sollte einen String zurückgeben, wenn der Stack leer ist', () => {
      expect(stack.peek()).toBe('Stack is empty');
    });
  });

  describe('clear()', () => {
    test('sollte alle Elemente aus dem Stack löschen', () => {
      stack.push('A');
      stack.push('B');
      expect(stack.size()).toBe(2);

      stack.clear();
      expect(stack.size()).toBe(0);
      expect(stack.isEmpty()).toBe(true);
    });
  });
});