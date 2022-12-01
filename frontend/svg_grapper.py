import glob
import re
import json
import os

if __name__ == "__main__":

    with open("svg.json","w") as json_file:
        file_list = glob.glob("./public/svg/icons/*svg")
        for filename in file_list:
    
            name = re.search(r'([a-zA-Z\s0-9]+)\.svg$', filename).group(1)

            json.dump({ "name": name, "filename":f"{name}.svg"}, json_file)
            json_file.write(os.linesep)



