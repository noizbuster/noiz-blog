import glob

for filename in glob.iglob('./content/posts/' + '**/*.md', recursive=True):
    f = open(filename)
    print(filename)
