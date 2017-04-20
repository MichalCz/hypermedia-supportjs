Programy do napisania
=======================

## ROT13

`Proste`: Napisz program w node, który zastosuje na ciągu znaków tzw. Szyfr
Cezara, albo inaczej ROT13. Moduł ma działać tak, że zamienia litery ABCD...XYZ
na odsunięte o 13 znaków, czyli pół alfabetu. Dane pobierze z pierwszego
argumentu, a po wynik wyświetli na ekranie.
Powinno działać tak:

    $ node rotate.js MICHAL
    ZVPUNY

* process.argv
* String.charAt
* String.indexOf
* console.log

`Gwiazdka`: Napisz to samo, ale działające dla małych i wielkich liter oraz
cyfr, tak, żeby każdy znak ROTował się o połowę alfabetu: "0...9A...Za...z".

`Gwiazdka.Gwiazdka`: Napisz to samo dla strumieni.

## Bufory

`Proste`: Napisz program w node, który tworzy bufor z podanego tekstu, odrwaca
kolejność bajtów w tym Buforze (Uwaga! Bajty to nie znaki - patrz Unicode), a
następnie wyrzuca zawartość na ekran.

Przydatne funkcje z dokumentacji:

* process.argv
* Buffer.from
* buf.readInt8
* buf.writeInt8
* process.stdout lub console.log

`Gwiazdka`: Stwórz z niego moduł, który udostępni tą funkcję przez require i
wrzuć do podkatalogu `modules/<wymyśl_nazwę>/` w tym repo w *osobnym branchu*!

`Gwiazdka.Gwiazdka`: Przepisz moduł tak, żeby akceptował strumienie np.
process.stdin i stdout i wykonywał w/w operację na każdej linii.

Przyda się:

* stream.Transform

## Argumenty

`Proste`: Napisz soft, który obsłguje linię poleceń za pomocą np. modułu
`yargs`. Powinien obsłużyć --help i kilka komend:

* `node program print` - wyświetla w konsoli "Hello World"
* `node program date` - wyświetla datę

Oraz opcje:

* `node program -p <prefix> <komenda>` - dodaje wartość prefix przed wynikiem
* `node program -e <komenda>` - wyświetla treść komendy na stderr, nie na stdout.

Przydatne:

* console.log, console.error
* [Dokumentacja Yargs](https://www.npmjs.com/package/yargs)
