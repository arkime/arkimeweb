---
title: Arkime Install
layout: wiki
permalink: "/install"
copyLink: True
---

- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="full-height-container with-footer p-3" markdown="1">


# Installation Guide for Arkime

This guide details the steps involved in installing Arkime, a large-scale indexed packet capture and search tool.
A basic Arkime cluster consists of a database (OpenSearch or Elasticsearch) and Arkime sensors.
Arkime sensors run the capture and viewer tools.
The capture tool is responsible for processing and storing the packets along with extracting the metadata to be stored in OpenSearch or Elasticsearch.
The viewer tool provides the end-user interface and packet retrieval.
While it is possible to run both the database and sensors on the same machine, it is not recommended for production environments.

## Prerequisites

A functional Linux system.
We recommend using a Long-Term Support (LTS) version of Ubuntu for its extended support window (5 years).
Users of other distributions may need to modify the installation commands.

## Installing OpenSearch or Elasticsearch

Arkime requires a database to store the metadata associated with the network sessions that are processed.
It is strongly recommended to NOT use the same machines for both the database and the sensors.
If you must use the same machines, please use different disk partitions for the database and the saved packets, otherwise, there will be contention for disk space and things will stop working.

### Download and Install OpenSearch or Elasticsearch

There are many ways to install [OpenSearch](https://opensearch.org/downloads.html) or [Elasticsearch](https://www.elastic.co/downloads/elasticsearch), we recommend using the official documentation.
For a test environment, running OpenSearch or Elasticsearch on the same machine as the Arkime sensor will work, otherwise, please use separate machines.
In a production environment, we recommend having at least three machines for OpenSearch/Elasticsearch to provide redundancy, and they work best with 3 leader/master nodes.
We currently support both OpenSearch and Elasticsearch equally.

### Install and Configure OpenSearch

Once you download OpenSearch, you can install it by running the following commands:
`apt install ./opensearch-*.deb`

You'll need to update the JVM heap size in the `/etc/opensearch/jvm.options` file.

`nano /etc/opensearch/jvm.options`

look for the following lines and update them:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable it to start on boot and start it with the following commands:
`systemctl enable --now opensearch`

### Install and Configure Elasticsearch

Once you download OpenSearch, you can install it by running the following commands:
`apt install ./elasticsearch-*.deb`

You'll need to update the JVM heap size in the `/etc/elasticsearch/jvm.options` file.

`nano /etc/elasticsearch/jvm.options`

look for the following lines and update them:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable it to start on boot and start it with the following commands:
`systemctl enable --now elasticsearch`

### Single Machine OpenSearch Example on Ubuntu
```
apt update
apt install -y wget curl
wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.13.0/opensearch-2.13.0-linux-x64.deb

# You should change this password, if it isn't strong enough install will fail. :(
# Minimum 10 character password and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
export OPENSEARCH_INITIAL_ADMIN_PASSWORD="PleaseChangeM3!"

apt install -y ./opensearch-2.13.0-linux-x64.deb
systemctl enable --now opensearch

# Verify that OpenSearch is running
sleep 5
curl -k --user "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_cat/health

```


## Installing Arkime Sensors

Once you have a working OpenSearch/Elasticsearch cluster you can install the Arkime sensors.

### Download Arkime

If new to Arkime we recommend starting with the latest [stabe version](https://github.com/arkime/arkime/releases/latest), however if you like to use the latest and greatest we have a [latest commit version](https://github.com/arkime/arkime/releases/last-commit).

The download page for each release contains multiple downloads.
When choosing an Arkime package, please select a version that corresponds to the Operating System and the architecture of your system.

NOTE: A clear indication of incorrect download are libssl or libyaml errors when trying to run capture.

### Installing Arkime Package

After downloading the Arkime package, you can install it by running the following commands:
* Ubuntu: `apt install ./arkime-*.deb`
* EL: `yum install ./arkime-*.rpm`

### Initialize the OpenSearch/Elasticsearch database

Once the Arkime package is installed, you need to initialize the OpenSearch/Elasticsearch database.
Most database operations are completed using the `db.pl` script located in the `/opt/arkime/db` directory.
You'll need to provide the URL of the OpenSearch/Elasticsearch database and the password you set during the OpenSearch/Elasticsearch installation.
If using the builtin OpenSearch/Elasticsearch certificates, you'll need to add a --insecure option if not on localhost.
```
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init
```

### Configure Arkime

We provide a simple Configuration script that will take a sample config.ini and create a new one with the correct settings.
You can always edit the /opt/arkime/etc/config.ini file directly.
To use the Configuration script, run the following command: `/opt/arkime/bin/Configure`

### Adding admin user

Before you can use Arkime you must add the first user.
You can change the password or other settings later in the Arkime UI.
```
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin
```

### Start the Arkime Sensor

To start the Arkime sensor, run the following command: `systemctl enable --now arkimecapture` and `systemctl enable --now arkimeviewer`
Log files are located in the `/opt/arkime/logs` directory if something goes wrong.

### Accessing the Arkime UI

Once the Arkime sensor is running, you can access the Arkime UI by navigating to `http://<hostname>:8005` in your web browser.
Use the authentication information from above, username `admin` and the password is `changeme`.

### Single Machine Arkime Example on Ubuntu 22 LTS
```
apt update
apt install -y wget iproute2 ethtool
#wget https://github.com/arkime/arkime/releases/download/v5.2.0/arkime_5.2.0-1.ubuntu2204_amd64.deb
#apt install -y ./arkime_5.2.0-1.ubuntu2204_amd64.deb
wget https://github.com/arkime/arkime/releases/download/last-commit/arkime-main_ubuntu2204_amd64.deb
apt install -y ./arkime-main_ubuntu2204_amd64.deb

# Configure Arkime
/opt/arkime/bin/Configure
### Interface: the interface to monitor
### Install Elasticsearch: no
### OpenSearch/Elasticsearch URL: https://localhost:9200
### OpenSearch/Elasticsearch User: admin
### OpenSearch/Elasticsearch Password: PleaseChangeM3!
### Password: A new password, not the ES password
### Download GeoIP: yes

# Intialize the database, use the password from OpenSearch/Elasticsearch!!!
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init

# Create the admin user
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin

# Start the Arkime Sensor
systemctl enable --now arkimecapture
systemctl enable --now arkimeviewer

# Verify that Arkime is running
sleep 1
tail /opt/arkime/logs/*.log
curl -u admin:changeme --digest http://localhost:8005/eshealth.json
```

</div>
