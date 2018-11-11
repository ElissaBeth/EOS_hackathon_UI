"""
File: __main__.py

This is the main file for the Static Analysis Tool.
"""
from find_vulnerabilities import Vulnerabilities


def main():
    entire_contract = ""

    # Open file. Put contents into single string
    with open("test_file", "r") as filestream:
        for line in filestream:
            entire_contract += line
        filestream.close()

    # Split string into three main components.
    contract_name, sha_id, contract_code = entire_contract.split(',', 2)

    # Create Vulnerabilities object and begin analyzing
    vulnerability_analyzer = Vulnerabilities(contract_code)
    vulnerabilities, quote = vulnerability_analyzer.run()

    # JSON formatted output printed to File
    with open("output_file", "w") as filestream:
        filestream.write('{"scanresults": {\n')
        filestream.write('  "name": "' + contract_name + '",\n')
        filestream.write('  "id": "' + sha_id + '",\n')
        filestream.write('  "quote": "' + str(quote) + '",\n')
        filestream.write('  "vulnerabilities": {\n')
        if not vulnerabilities:
            filestream.write("    []\n")
        else:
            for index, vuln in enumerate(vulnerabilities):
                filestream.write('    "vuln_' + str(index + 1) + '": {\n')
                filestream.write('      "name": "' + vuln[1] + '",\n')
                filestream.write('      "count": "' + str(vuln[0]) + '",\n')
                filestream.write('      "line_num": "' + str(vuln[2]) + '",\n')
                filestream.write('      "error_code": [\n')
                for line in vuln[3]:
                    filestream.write('        "' + line + '",\n')
                filestream.write('      ]\n')
                filestream.write('    }\n')
        filestream.write('  }\n')
        filestream.write('}')
        filestream.close()


if __name__ == "__main__":
    main()

