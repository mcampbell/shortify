import requests
import random
import sys
from collections import defaultdict

with open('data.txt', 'r') as f:
    data = f.read().split()

l = len(data)

iterations = int(1 if len(sys.argv) == 1 else sys.argv[1])
statuses = defaultdict(int)

for _ in range(iterations):
    r = requests.get('http://localhost:5001/{}'.format(data[random.randint(0, l-1)]), allow_redirects=False)
    statuses[r.status_code] += 1

print(statuses)
