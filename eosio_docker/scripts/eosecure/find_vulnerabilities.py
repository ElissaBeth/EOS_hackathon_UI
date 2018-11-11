"""
This is the main file to perform the vulnerability scanning.
"""

import re


class Vulnerabilities(object):
    """
    This is the main class for Vulnerability scanning.

    Args:
        contract_code (string): A string containing all of the contract code.

    Attributes:
        vulnerabilities (list): List of lists of strings. Each list is a specific
            vulnerability with 4 elements to it: # of that Vulnerability, what that
            vulnerability is, the line of code it appears at, and what that line of
            code is.
        quote (int): This is the total quote price for releasing information about
            the vulnerabilities.
        entire_contract (list): List of strings containing all of the contract code.
            Each list element is a full line of code.
        functions (list): List of strings containing all of the in-use functions. The
            last item is the current function being analyzed with previous items being
            function calls that have been made.
        variables (dict): Dictionary of variables in use by the code.
            {key=variable name: value=variable value}
    """

    def __init__(self, contract_code):
        self.vulnerabilities = []
        self.quote = 0
        self.entire_contract = contract_code.split("\n")
        self.functions = []
        self.variables = {}

    def run(self):
        """
        This is where all the main vulnerabilities are called.

        Returns:
            vulnerabilities (list): List of vulnerabilities found.
            quote (int): Cost of releasing info on vulnerabilities.
        """
        vuln = self.vuln_bet_transfer_hack()
        if vuln is not None:
            self.vulnerabilities.append(vuln)

        return self.vulnerabilities, self.quote

    def get_func_name(self, line):
        """
        This extracts the name of a function by trimming off the
        unneeded characters and returning just the name.

        Args:
            line (string): Line of code that holds the function name.

        Return:
            func_name (string): Name of the function
        """
        search = "\s[a-zA-Z0-9_]*[(]"

        regex = re.compile(search)
        lst = regex.findall(line)
        func_name = ''.join(lst)
        func_name = func_name.strip(" ").strip("(")

        return func_name

    def get_var_name(self, line):
        """
        This extracts the name and value of a variable
        by trimming off unneeded characters.

        Args:
            line (string): Line of code that holds the variable name.

        Returns:
            var_name (string): Name of the variable found.
            var_value (string): Value of the variable found.
        """
        search_name = "\s[a-zA-Z0-9_]*\s[=]"
        search_value = "[=]\s[^;]*[;]"

        regex = re.compile(search_name)
        lst = regex.findall(line)
        var_name = ''.join(lst)
        var_name = var_name.strip("=").strip(" ")

        regex = re.compile(search_value)
        lst = regex.findall(line)
        var_value = ''.join(lst)
        var_value = var_value.strip(";").strip("=").strip(" ")

        return var_name, var_value

    def vuln_bet_transfer_hack(self):
        """
        This function checks for the Bet Transfer Hack vulnerability. We
        need to verify that the transfer() function contains the line of
        code that verifies the 'to' and 'from' address.

        Return:
            (string): Returns the string of the vulnerability and how many
                times the vulnerability shows up. Returns None if no
                vulnerability.
        """
        vuln_info = []
        vuln_found = False
        vuln_fixed = False
        in_func = False
        bracket_count = 0
        grab_error_code = False
        error_line_code = []
        error_line_index = 0

        # This is used to verify the vulnerability solution. The below string
        # must be found as either the To or From account when transferring.
        username = "eosbetdice11"

        for index, line in enumerate(self.entire_contract):
            # Concatenate lines of code if error found within function
            if grab_error_code:
                error_line_code.append(line)
            # Check if you are entering a void function
            if "void" in line and "(" in line and ")" in line:
                self.functions.append(self.get_func_name(line))
                in_func = True
                # If this is the void transfer function, then begin checking for vulnerability
                if 'transfer' in self.functions[-1]:
                    vuln_found = True
                    grab_error_code = True
                    error_line_code.append(line)
                    error_line_index = index + 1  # Index starts at zero, lines of code start at 1
                else:
                    vuln_found = False
            # Otherwise, if you are already in a function ...
            elif in_func:
                # If you enter an if, switch, etc increment # of brackets found
                if "{" in line:
                    bracket_count += 1
                # If an equal sign is found, create a new variable.
                if " = " in line:
                    name, value = self.get_var_name(line)
                    name = self.functions[-1] + "." + name
                    self.variables[name] = value
                # If the current function contains the vuln, check if fix is implemented
                if vuln_found:
                    if username in line and "assert" in line and ".to" in line and ".from" in line:
                        vuln_fixed = True
                # If an end bracket is found, remove one from current count or "exit" function
                if "}" in line:
                    if bracket_count == 0:
                        in_func = False
                        grab_error_code = False
                        del self.functions[-1]
                    else:
                        bracket_count -= 1

        if vuln_found:  # Was a possible vulnerability found?
            if not vuln_fixed:  # Was that vulnerability fixed?
                vuln_info.append(1)  # This error can only occur once.
                vuln_info.append("bet_transfer_hack")  # Name of Hack
                vuln_info.append(error_line_index)  # Index of when code starts
                vuln_info.append(error_line_code)  # Function that error occurs in
                self.quote += 500
                return vuln_info
        return None

