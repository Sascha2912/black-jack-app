'use strict';

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 3, 7, 3];


// Verändert das Ursprungsarray
numbers.splice(2, 1); // startet bei index 2 und löscht dann 1 Element

// Verändert das Ursprungsarray
numbers.pop(); // Entfernt das letzte Element aus den Ursprungsarray

// Verändert das  Ursprungsarray
numbers.shift(); // Entfernt das erste Element aus den Ursprungsarray

// indexOf() + splice(), verändert das Ursprungsarray
// Entfernt den ersten vorkommenden Wert aus dem Ursprungsarray
let index = numbers.indexOf(3); // Sucht den index vom ersten Element mit dem Wert 3
if (index !== -1){ // prüft ob der Index im Array existiert
    numbers.splice(index, 1); // Starten bei der gefunden Indexposition und löscht 1 Element.
}

// Erstellt ein neues Array 
numbers.filter(num => num !== 3); // füllt das neue Array mit allen Elementen aus dem Ursprungsarray dessen Wert nicht gleich 3 ist.

console.log(numbers);