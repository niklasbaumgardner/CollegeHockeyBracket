import re
from pathlib import Path

base_dir = Path(__file__).resolve().parent.parent


init_file = open(base_dir / "bracketapp" / "__init__.py", "r+")
init_file_contents = str(init_file.read())
init_match = re.search(r"nbbracketchallenge@(\d+\.\d+\.\d+)", init_file_contents)

if init_match:
    current_version = init_match.group(1)
    version_parts = list(map(int, current_version.split(".")))
    new_version = f"{version_parts[0]}.{version_parts[1]}.{version_parts[2] + 1}"
    new_file_contents = init_file_contents.replace(
        f"nbbracketchallenge@{current_version}", f"nbbracketchallenge@{new_version}"
    )

    init_file.seek(0)
    init_file.truncate()
    init_file.write(new_file_contents)


init_file.close()

sentry_file = open(base_dir / "bracketapp" / "static" / "js" / "sentry.mjs", "r+")
sentry_file_contents = str(sentry_file.read())

sentry_match = re.search(
    r"nbbracketchallengefront@(\d+\.\d+\.\d+)", sentry_file_contents
)
if sentry_match:
    current_version = sentry_match.group(1)
    version_parts = list(map(int, current_version.split(".")))
    new_version = f"{version_parts[0]}.{version_parts[1]}.{version_parts[2] + 1}"
    new_file_contents = sentry_file_contents.replace(
        f"nbbracketchallengefront@{current_version}",
        f"nbbracketchallengefront@{new_version}",
    )

    sentry_file.seek(0)
    sentry_file.truncate()
    sentry_file.write(new_file_contents)


sentry_file.close()
