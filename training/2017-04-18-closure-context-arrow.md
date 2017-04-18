Context/Closure/Arrow
=======================

Wyjaśnimy tutaj kilka podstawowych pojęć w Javascript.

Closure
---------

Closure oznacza zakres zmiennych do którego określona metoda ma dostęp. Każdy
program javascript zaczyna się od tzw. globalnego kontekstu. Jest to domyślny
koteskt wywołania funkcji, jeśli nie wskazano innego, ale wszystkie funkcje mają
dostęp do jego własności tak jakby były zmiennymi.

Każda nowa funkcja posiada zamknięty, dla siebie i funkcji stworzonych wewnątrz,
zestaw zmiennych i stałych. Ten zestaw nazywa się closure.

Działa to mniej tak:

    let x = 0;
    let y = 1;

    console.log(x, y); // 0 1

    function() {
        const y = 3;
        const z = 5;

        console.log(x, y, z); // 0 3 5
        // x jest dostępne z closure globalnego kontekstu
        // y jest dostępne z closure
        // z jest dostępne tylko lokalnie

        function() {
            const k = 1;

            console.log(x, y, z, k); // 7 3 5 1
        }

    }

    console.log(z); // błąd "z is not defined" - JS nie wie, co to jest "z" na
                    // tym poziomie.

W node każdy moduł jest zapakowany w funkcję, dlatego nie ma możliwości
dzielenia globalnego kontekstu "przypadkiem", jak w przeglądarce - dlatego jeśli
w danym pliku (każdy plik jest modułem) chcemy użyć np. modułu `request`, wtedy
musimy użyć `require`.

W pewnym zakresie closure jest dostępne również w blokach, ale tylko przy
poleceniach let i const.

    const k = [1, 2, 3, 4];
    for (const n = 0; n < k.length; n++) {
        let r = k[n]
        // tutaj dostępne jest "n" i "r"
    }
    // tutaj już nie jest dostępne i odwołanie do niego wywoła błąd.

Context
---------

Słowo kluczowe `this` w Javascript działa nieco inaczej niż w innych językach. W
przeciwieństwie do Java, C#, PHP itp. this nie jest związany bezpośrednio z
klasą. Zacznijmy od zdefiniowania funkcji w obiekcie:

    const obj = {
        name: "aaa",
        func(arg1) {
            console.log(arg1, this.name);
        }
    }

Funckję możemy wykonać na kilka sposobów osiągając różne rezultaty:

    obj.func("abc");    // abc aaa

    const foo = {
        name: "bbb",
        func: obj.func
    };
    foo.func("abc");    // abc bbb

    const bar = obj.func;
    bar("abc");         // abc undefined

Dlatego, że:

    foo.bar()
    ^   ^
    |   +---- nazwa funkcji w obiekcie
    +-------- kontekst wywołania, czyli `this` w funkcji.

Kilka innych sposobów na zdefiniowanie `this`:

    obj.func.call(dowolny_kontekst, arg1, arg2...)
        // wywołuje funkcję z dowolnym `this`
    obj.func.apply(dowolny_kontekst, [arg1, arg2...])
        // wywołuje funkcję z dowolnym `this`

    obj.func.bind(dowolny_kontekst, domyslny_arg1, ...)
        // zwraca funkcje, która wywoła funkcję z dowolnym kontekstem i predefiniowanymi argumentami

[Więcej o Function.prototype na MDN](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)

Arrow
-------

Strzałka, albo `lambda`: Funkcja nie posiadająca kontekstu, czyli operująca
jedynie na Closure i własnych argumentach. Z tekstu takiej funkcji można
zdecydować, do których zmiennych musi ona mieć dostęp.

### Kilka przykładów:

Arrow zwraca argument, jeśli nie otworzymy bloku kodu:

    () => 0
    // to samo co:
    function() { return 0; }

    arg => arg + 1
    // to samo co:
    function(arg) { return arg + 1; }

    (arg1, arg2) => arg1 + arg2
    // to samo co:
    function(arg1, arg2) { return arg1 + arg2; }

    let z = 0;
    (arg1, arg2) => (z += arg1, z + arg2)
    // to samo co:
    function(arg1, arg2) { z += arg1; return z + arg2; }

Brak kontekstu:

    const obj = {
        name: "aaa",
        run() {
            this.ref = () => this.name;
        }
    };
    const foo = {name: "bbb"};

    obj.run();  // kontekstem jest obj.
    console.log(obj.ref.call(foo)); // nadal "aaa", bo lambda nie posiada własnego kontekstu.

Bloki kodu:

    (arg) => {
        console.log(arg);
        return arg + 1;
    }

    (arr) => {
        let x = arr.map((item) => Math.abs(item - 1));
        return x.sort();
    }
